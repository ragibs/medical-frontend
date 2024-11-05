import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateText(prompt: string) {
  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GOOGLE_GEN_AI_KEY as string
  );
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      maxOutputTokens: 150,
      temperature: 0.5,
    },
  });

  try {
    // Use type assertion to bypass TypeScript errors
    const result = await model.generateContent(
      `Please summarize the following text and refer to the subject as "patient": "${prompt}"`
    );
    return result.response.text();
  } catch (error) {
    console.error("Error generating text:", error);
    return null;
  }
}
