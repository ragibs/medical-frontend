"use client";

import { useState } from "react";
import { generateText } from "@/config/geminiConfig";

const TextGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [generatedText, setGeneratedText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const text = await generateText(prompt);
      setGeneratedText(text || "Error generating text.");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>
      {generatedText && <p>{generatedText}</p>}
    </div>
  );
};

export default TextGenerator;
