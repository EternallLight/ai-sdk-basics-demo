import { generateObject } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import dotenv from "dotenv";
import { z } from "zod";

import { systemPrompt as grayCatSystemPrompt } from "./const/system_prompt";

// Load the environment variables from the .env.local file
dotenv.config({ path: ".env.local" });

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const catSchema = z.object({
  breed: z.string().describe("The breed of the cat."),
  color: z
    .enum([
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
    ])
    .describe(
      "The color of the cat. Must be one of the exact values: blue, lilac, cream, black, white, chocolate, red, fawn, cinnamon, blue-cream, tortoiseshell, golden, silver, smoke."
    ),
  age: z
    .number()
    .describe(
      "The age of the cat in years as a number (e.g., 3 not '3 years')."
    ),
  weight: z
    .number()
    .describe(
      "The weight of the cat in kilograms as a number (e.g., 10 not '10 kg')."
    ),
  personality: z.string().describe("The personality of the cat."),
  favoriteFood: z.string().describe("The favorite food of the cat."),
  favoriteToy: z.string().describe("The favorite toy of the cat."),
});

async function main() {
  try {
    const result = await generateObject({
      model: anthropic("claude-3-5-sonnet-20241022"),
      system: grayCatSystemPrompt,
      prompt:
        grayCatSystemPrompt +
        " Please provide your characteristics as a cat in the exact JSON format specified by the schema. Include breed, color (must be one of: blue, lilac, cream, black, white, chocolate, red, fawn, cinnamon, blue-cream, tortoiseshell, golden, silver, smoke), age (as a number), weight (as a number), personality, favoriteFood, and favoriteToy.",
      schema: catSchema,
      schemaName: "CatCharacteristics",
      schemaDescription:
        "A structured representation of a cat's characteristics including breed, color, age, weight, personality, favorite food, and favorite toy.",
      mode: "json",
    });
    console.log(result.object);
  } catch (error) {
    console.error("Error details:", error);
  }
}

main();
