import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { Doctor } from "@/types/types";

export async function summarizeSymptoms(prompt: string) {
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
    const result = await model.generateContent(
      `Please summarize the following text and refer to the subject as "patient": "${prompt}"`
    );
    console.log(result);
    return result.response.text();
  } catch (error) {
    console.error(error);
    return `Error generating text:", ${error})`;
  }
}

export async function recommendDoctor(doctors: Doctor[], symptom: string) {
  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GOOGLE_GEN_AI_KEY as string
  );

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "I will pass you an object with a list of doctors and patient symptoms. Based on the symptoms provided, recommend the best doctor for the patient.",
  });

  const doctorRecommendationSchema = {
    description: "Recommendation of a doctor based on patient's symptoms",
    type: SchemaType.OBJECT,
    properties: {
      doctorId: {
        type: SchemaType.NUMBER,
        description: "The unique ID of the recommended doctor",
        nullable: false,
      },
      doctorName: {
        type: SchemaType.STRING,
        description:
          "Name of the recommended doctor in the format 'Dr. [First Name] [Last Name]'",
        nullable: false,
      },
      recommendation: {
        type: SchemaType.STRING,
        description:
          "A detailed explanation of why the doctor is recommended based on the patient's symptoms",
        nullable: false,
      },
    },
    required: ["doctorId", "doctorName", "recommendation"],
  };

  const chatSession = model.startChat({
    generationConfig: {
      maxOutputTokens: 150,
      temperature: 0.5,
      responseMimeType: "application/json",
      responseSchema: doctorRecommendationSchema,
    },
    history: [
      {
        role: "user",
        parts: [
          // Include the list of doctors
          {
            text: JSON.stringify(doctors, null, 4),
          },
          // Include the symptom
          {
            text: symptom,
          },
        ],
      },
    ],
  });

  // Send a message to get the doctor's recommendation
  const result = await chatSession.sendMessage(
    "Recommend a doctor based on the provided symptom."
  );
  return JSON.parse(result.response.text());
}
