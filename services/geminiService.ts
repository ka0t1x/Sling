import { GoogleGenAI, Type } from "@google/genai";
import { GeminiResponse, VideoData } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateViralCaption = async (video: VideoData): Promise<GeminiResponse> => {
  if (!apiKey) {
    console.warn("No API Key provided");
    return { caption: "Add your API Key to use AI features!", hashtags: ["#noapikey"] };
  }

  try {
    const model = "gemini-2.5-flash";
    const prompt = `
      You are a social media expert.
      Based on this video description: "${video.description}" and the username "${video.username}",
      generate a new, more viral, catchy caption and a set of trending hashtags.
      Also provide a short witty analysis of why this video might go viral.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            caption: { type: Type.STRING },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
            analysis: { type: Type.STRING }
          },
          required: ["caption", "hashtags", "analysis"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("Empty response from AI");
    
    return JSON.parse(jsonText) as GeminiResponse;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return { 
      caption: "Could not generate caption at this time.", 
      hashtags: ["#error"],
      analysis: "AI is currently sleeping."
    };
  }
};
