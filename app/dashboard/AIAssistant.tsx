"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_GEN_AI_KEY as string
);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 100,
  responseMimeType: "text/plain",
};

type Message = {
  role: "user" | "ai";
  content: string;
};

export function AIAssistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Welcome to the AI Assistant. How can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;

      setIsLoading(true);
      setMessages((prev) => [...prev, { role: "user", content: input }]);

      try {
        // Initialize chat session if it hasn't been initialized yet
        let currentChatSession = chatSession;
        if (!currentChatSession) {
          currentChatSession = await model.startChat({
            generationConfig,
            history: [],
          });
          setChatSession(currentChatSession);
        }

        // Now safely send the message using the initialized session
        const result = await currentChatSession.sendMessage(input);
        const aiResponse = await result.response.text();

        setMessages((prev) => [...prev, { role: "ai", content: aiResponse }]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: "Sorry, I encountered an error. Please try again.",
          },
        ]);
      } finally {
        setIsLoading(false);
        setInput("");
      }
    },
    [input, chatSession]
  );

  return (
    <Card className="bg-chiffon border-pine">
      <CardHeader>
        <CardTitle className="text-2xl text-sacramento">AI Assistant</CardTitle>
        <CardDescription className="text-pine">
          Get help from our AI assistant
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[300px] overflow-y-auto p-4 bg-white">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-tangerine text-white"
                      : "bg-salmon text-white"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type your question here..."
              className="border-pine focus:ring-tangerine"
              disabled={isLoading}
            />
            <Button
              type="submit"
              className="w-full bg-tangerine hover:bg-salmon text-chiffon"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Ask AI Assistant"
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
