import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import dotenv from "dotenv";
import { z } from "zod";

// Load the environment variables from the .env.local file
dotenv.config({ path: ".env.local" });

const openai = createOpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const simpleSchema = z.object({
  catName: z.string().describe("The name of the cat"),
  catBreed: z
    .string()
    .describe(
      "The breed of the cat (e.g., British Shorthair, Persian, Siamese, Maine Coon)"
    ),
  catColor: z.string().describe("The primary color of the cat's fur"),
  catAge: z
    .number()
    .describe(
      "The age of the cat in years as a number (e.g., 3 not '3 years')"
    ),
  catWeight: z
    .number()
    .describe("The weight of the cat in kg as a number (e.g., 10 not '10 kg')"),
});

async function main() {
  try {
    console.log("Generating object...\n");

    const result = await generateObject({
      model: openai("gpt-4o"),
      prompt:
        "Generate data that matches the exact schema structure with the fields: catName, catBreed, catColor, catAge, catWeight. Fill in realistic values for each field. Age and weight must be numbers.",
      schema: simpleSchema,
      mode: "json",
    });

    console.log("✨ Generated object:");
    console.log(JSON.stringify(result.object, null, 2));
  } catch (error) {
    console.error("Error details:", error);
  }
}

main();
