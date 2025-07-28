import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import dotenv from "dotenv";

import { systemPrompt as grayCatSystemPrompt } from "./const/system_prompt";

// Load the environment variables from the .env.local file
dotenv.config({ path: ".env.local" });

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function main() {
  const result = await generateText({
    model: anthropic("claude-3-5-sonnet-20241022"),
    system: grayCatSystemPrompt,
    prompt: "Hey, what is your favorite breed of cat?",
  });
  console.log(result.text);
}

main();
