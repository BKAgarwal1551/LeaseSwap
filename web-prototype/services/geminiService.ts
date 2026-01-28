
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const enhanceDescription = async (suburb: string, rent: string, features: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a compelling property listing description for an apartment in ${suburb} costing $${rent}/month. Features include: ${features.join(', ')}. Keep it under 200 characters.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 100,
      },
    });
    return response.text?.trim() || "A wonderful place to live!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating description. Please try again.";
  }
};
