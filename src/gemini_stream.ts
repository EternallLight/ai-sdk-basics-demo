import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import dotenv from "dotenv";

import { systemPrompt as grayCatSystemPrompt } from "./const/system_prompt";

// Load the environment variables from the .env.local file
dotenv.config({ path: ".env.local" });

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  const result = await streamText({
    model: google("gemini-2.5-flash"),
    system: grayCatSystemPrompt,
    prompt:
      "Hey, what is your favorite breed of cat? Answer at least 300 words.",
  });
  for await (const chunk of result.textStream) {
    // You can do console.log here, but it will insert a new line after each chunk
    process.stdout.write(chunk);
  }
}

main();
