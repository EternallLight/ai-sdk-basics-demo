import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

import { systemPrompt as grayCatSystemPrompt } from "./const/system_prompt";

// Load the environment variables from the .env.local file
dotenv.config({ path: ".env.local" });

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  try {
    const prompt = `${grayCatSystemPrompt}
    Please provide your characteristics as a cat in the exact JSON format specified by the schema. Include breed, color (must be one of: blue, lilac, cream, black, white, chocolate, red, fawn, cinnamon, blue-cream, tortoiseshell, golden, silver, smoke), age (as a number), weight (as a number), personality, favoriteFood, and favoriteToy.
    Be as wordy as possible.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            breed: {
              type: Type.STRING,
              description: "The breed of the cat.",
            },
            color: {
              type: Type.STRING,
              description:
                "The color of the cat. Must be one of the exact values: blue, lilac, cream, black, white, chocolate, red, fawn, cinnamon, blue-cream, tortoiseshell, golden, silver, smoke.",
              enum: [
                "blue",
                "lilac",
                "cream",
                "black",
                "white",
                "chocolate",
                "red",
                "fawn",
                "cinnamon",
                "blue-cream",
                "tortoiseshell",
                "golden",
                "silver",
                "smoke",
              ],
            },
            age: {
              type: Type.NUMBER,
              description:
                "The age of the cat in years as a number (e.g., 3 not '3 years').",
            },
            weight: {
              type: Type.NUMBER,
              description:
                "The weight of the cat in kilograms as a number (e.g., 10 not '10 kg').",
            },
            personality: {
              type: Type.STRING,
              description: "The personality of the cat.",
            },
            favoriteFood: {
              type: Type.STRING,
              description: "The favorite food of the cat.",
            },
            favoriteToy: {
              type: Type.STRING,
              description: "The favorite toy of the cat.",
            },
          },
          propertyOrdering: [
            "breed",
            "color",
            "age",
            "weight",
            "personality",
            "favoriteFood",
            "favoriteToy",
          ],
        },
      },
    });

    console.log("Generated cat characteristics:");
    if (response.text) {
      console.log(JSON.parse(response.text));
    } else {
      console.log("No response text received");
    }
  } catch (error) {
    console.error("Error details:", error);
  }
}

main();
