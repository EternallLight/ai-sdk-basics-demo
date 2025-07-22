import { generateText } from "ai";
import { createPerplexity } from "@ai-sdk/perplexity";
import dotenv from "dotenv";

import { systemPrompt as grayCatSystemPrompt } from "./const/system_prompt";

// Load the environment variables from the .env.local file
dotenv.config({ path: ".env.local" });

const perplexity = createPerplexity({
  apiKey: process.env.PERPLEXITY_API_KEY,
});

async function main() {
  const result = await generateText({
    model: perplexity("sonar-pro"),
    system: grayCatSystemPrompt,
    prompt: "Hey, what is your favorite breed of cat?",
  });
  console.log(result.text);
  console.log(result.sources);
}

main();
