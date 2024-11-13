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
import { Appointment } from "@/types/types";
import { useUserContext } from "../context";
import ReactMarkdown from "react-markdown";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GOOGLE_GEN_AI_KEY as string
);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    maxOutputTokens: 100,
    temperature: 0.5,
  },
});

type Message = {
  role: "user" | "ai";
  content: string;
};

type AIAssistantProps = {
  appointments: Appointment[];
};

export const AIAssistant: React.FC<AIAssistantProps> = ({ appointments }) => {
  const [input, setInput] = useState("");
  const { user } = useUserContext();

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: `Hello ${user?.first_name}. How can I help you today?`,
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

  useEffect(() => {
    // Function to format appointments based on user role
    const getFormattedAppointments = (
      appointments: Appointment[],
      userRole: string | undefined,
      userName: string | undefined
    ) => {
      return appointments
        .map((appt) => {
          if (userRole === "ADMIN") {
            return `Doctor: ${appt.doctor_full_name}, Patient: ${
              appt.patient_full_name
            }, Date: ${appt.date}, Time: ${appt.time}, Symptoms: ${
              appt.ai_summarized_symptoms ?? "N/A"
            }`;
          } else if (userRole === "DOCTOR") {
            return `Patient: ${appt.patient_full_name}, Date: ${
              appt.date
            }, Time: ${appt.time}, Symptoms: ${
              appt.ai_summarized_symptoms ?? "N/A"
            }`;
          } else if (userRole === "PATIENT") {
            return `Doctor: ${appt.doctor_full_name}, Date: ${
              appt.date
            }, Time: ${appt.time}, Symptoms: ${
              appt.ai_summarized_symptoms ?? "N/A"
            }`;
          } else {
            return `Date: ${appt.date}, Time: ${appt.time}, Symptoms: ${
              appt.ai_summarized_symptoms ?? "N/A"
            }`;
          }
        })
        .join("\n");
    };

    const formattedAppointments = getFormattedAppointments(
      appointments,
      user?.role,
      user?.first_name
    );

    const newChatSession = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: `You are an AI assistant interacting with ${user?.role.toLowerCase()} ${
                user?.first_name
              }. Here are the current appointments:\n${formattedAppointments}\n\nIMPORTANT: Only answer questions related to the above appointments. Do not answer any other questions or provide any information beyond this context. If a question is unrelated, respond with "I'm only able to answer questions about the provided appointments."`,
            },
          ],
        },
      ],
    });

    setChatSession(newChatSession);
  }, [appointments]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!input.trim()) return;

      setIsLoading(true);
      setMessages((prev) => [...prev, { role: "user", content: input }]);

      try {
        if (!chatSession) {
          console.error("Chat session is not initialized");
          setMessages((prev) => [
            ...prev,
            {
              role: "ai",
              content: "Chat session is not ready. Please wait and try again.",
            },
          ]);
          return;
        }

        const result = await chatSession.sendMessage(input);
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
          Get assistance from our AI assistant. Ask any questions related to
          your appointments.
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
                      : "bg-pine text-white"
                  }`}
                >
                  {message.role === "ai" ? (
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  ) : (
                    <span>{message.content}</span>
                  )}
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
};
