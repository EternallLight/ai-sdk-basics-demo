import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import dotenv from "dotenv";

import { systemPrompt as grayCatSystemPrompt } from "./const/system_prompt";

// Load the environment variables from the .env.local file
dotenv.config({ path: ".env.local" });

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  const result = await generateText({
    model: google("gemini-2.5-flash"),
    system: grayCatSystemPrompt,
    prompt: "Hey, what is your favorite breed of cat?",
  });
  console.log(result.text);
}

main();
