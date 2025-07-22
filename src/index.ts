import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import dotenv from "dotenv";

import { systemPrompt as grayCatSystemPrompt } from "./const/system_prompt";

// Load the environment variables from the .env.local file
dotenv.config({ path: ".env.local" });

const openai = createOpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

async function main() {
  const result = await generateText({
    model: openai("gpt-4o-mini"),
    system: grayCatSystemPrompt,
    prompt: "Hey, what is your favorite breed of cat?",
  });
  console.log(result.text);
}

main();
