import { streamText } from "ai";
import { createPerplexity } from "@ai-sdk/perplexity";
import dotenv from "dotenv";

import { systemPrompt as grayCatSystemPrompt } from "./const/system_prompt";

// Load the environment variables from the .env.local file
dotenv.config({ path: ".env.local" });

const perplexity = createPerplexity({
  apiKey: process.env.PERPLEXITY_API_KEY,
});

async function main() {
  const result = await streamText({
    model: perplexity("sonar-pro"),
    system: grayCatSystemPrompt,
    prompt:
      "Hey, what is your favorite breed of cat? Answer at least 300 words.",
  });

  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
  }

  console.log(await result.sources);
}

main();
