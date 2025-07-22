import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import dotenv from "dotenv";

import { systemPrompt as grayCatSystemPrompt } from "./const/system_prompt";

// Load the environment variables from the .env.local file
dotenv.config({ path: ".env.local" });

const openai = createOpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

async function main() {
  try {
    // Get the partial input from command line arguments
    const partialInput = process.argv[2] || "My favorite thing to do is";

    // Append autocomplete helper instruction to the existing system prompt
    const autocompleteSystemPrompt = `${grayCatSystemPrompt} You are also an autocomplete helper. Complete the user's input naturally and concisely. Only provide the completion, not the full text. Keep your completions short and in character as the Gray Cat. Do not include any other text or comments. Omit the original text in your response.`;

    console.log(`🐱 Autocomplete demo for: "${partialInput}"\n`);

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: autocompleteSystemPrompt,
      prompt: `Complete this text: "${partialInput}"`,
      maxTokens: 30, // Limit response length for suggestions
      temperature: 0.3, // Lower temperature for more predictable completions
    });

    // Stream the completion as it's generated
    for await (const chunk of result.textStream) {
      process.stdout.write(chunk);
    }

    console.log("\n\n✨ Autocomplete complete!");
  } catch (error) {
    console.error("Error details:", error);
  }
}

main();
