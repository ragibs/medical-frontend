import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AIAssistant() {
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
          <p className="text-sacramento">
            Welcome to the AI Assistant. How can I help you today?
          </p>
          <Input
            type="text"
            placeholder="Type your question here..."
            className="border-pine focus:ring-tangerine"
          />
          <Button className="w-full bg-tangerine hover:bg-salmon text-chiffon">
            Ask AI Assistant
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
