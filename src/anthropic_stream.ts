import { streamText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import dotenv from "dotenv";

import { systemPrompt as grayCatSystemPrompt } from "./const/system_prompt";

// Load the environment variables from the .env.local file
dotenv.config({ path: ".env.local" });

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function main() {
  const result = await streamText({
    model: anthropic("claude-3-5-sonnet-20241022"),
    system: grayCatSystemPrompt,
    prompt:
      "Hey, what is your favorite breed of cat? Answer at least 300 words.",
  });
  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
  }
}

main();
