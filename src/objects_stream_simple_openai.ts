import { streamObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import dotenv from "dotenv";
import { z } from "zod";

// Load the environment variables from the .env.local file
dotenv.config({ path: ".env.local" });

const openai = createOpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const simpleSchema = z.object({
  catName: z.string(),
  catBreed: z.string(),
  catColor: z.string(),
  catAge: z.number(),
  catWeight: z.number(),
  catHeight: z.number(),
  catLength: z.number(),
  catWidth: z.number(),
  catDepth: z.number(),
  catVolume: z.number(),
});

async function main() {
  try {
    const result = streamObject({
      model: openai("gpt-4o"),
      prompt:
        "Generate data that matches the exact schema structure with the fields: catName, catBreed, catColor, catAge, catWeight, catHeight, catLength, catWidth, catDepth, catVolume. Fill in realistic values for each field.",
      schema: simpleSchema,
      mode: "json",
    });

    console.log("Streaming object generation...\n");

    // Stream the partial objects as they're generated
    for await (const partialObject of result.partialObjectStream) {
      console.clear();
      console.log("Current partial object:");
      console.log(JSON.stringify(partialObject, null, 2));
    }

    // Get the final complete object
    const finalObject = await result.object;
    console.log("\n✨ Final object:");
    console.log(JSON.stringify(finalObject, null, 2));
  } catch (error) {
    console.error("Error details:", error);
  }
}

main();
