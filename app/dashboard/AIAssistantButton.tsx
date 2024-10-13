import { Button } from "@/components/ui/button";
import { BotMessageSquare, X } from "lucide-react";

export function AIAssistantButton({ toggleAiAssistant, isOpen }) {
  return (
    <Button
      className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg bg-tangerine hover:bg-salmon text-chiffon"
      onClick={toggleAiAssistant}
    >
      {isOpen ? (
        <X className="h-6 w-6" />
      ) : (
        <BotMessageSquare className="h-6 w-6" />
      )}
      <span className="sr-only">AI Assistant</span>
    </Button>
  );
}
