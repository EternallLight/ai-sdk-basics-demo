# Vercel AI Basics Demo

A demonstration project showcasing various AI providers using the Vercel AI SDK.

## Supported AI Providers

- **OpenAI** - GPT models via OpenAI API
- **Google (Gemini)** - Gemini models via Google AI API
- **Perplexity** - Perplexity models via Perplexity API
- **Anthropic (Claude)** - Claude models via Anthropic API

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment template and add your API keys:
   ```bash
   cp env.template .env.local
   ```

3. Add your API keys to `.env.local`:
   ```
   OPEN_AI_API_KEY=your_openai_key_here
   GEMINI_API_KEY=your_gemini_key_here
   PERPLEXITY_API_KEY=your_perplexity_key_here
   ANTHROPIC_API_KEY=your_anthropic_key_here
   ```

## Usage

### Text Generation

Generate text with different providers:

```bash
# OpenAI
npm run dev src/openai_generate.ts

# Google (Gemini)
npm run dev src/gemini_generate.ts

# Perplexity
npm run dev src/perplexity_generate.ts

# Anthropic (Claude)
npm run dev src/anthropic_generate.ts
```

### Text Streaming

Stream text responses:

```bash
# OpenAI
npm run dev src/openai_stream.ts

# Google (Gemini)
npm run dev src/gemini_stream.ts

# Perplexity
npm run dev src/perplexity_stream.ts

# Anthropic (Claude)
npm run dev src/anthropic_stream.ts
```

### Object Generation

Generate structured objects with schemas:

```bash
# OpenAI
npm run dev src/objects_generate.ts

# Google (Gemini)
npm run dev src/objects_generate_gemini.ts

# Anthropic (Claude)
npm run dev src/objects_generate_anthropic.ts
```

### Object Streaming

Stream structured objects:

```bash
# OpenAI
npm run dev src/objects_stream.ts

# Google (Gemini)
npm run dev src/objects_stream_gemini.ts

# Anthropic (Claude)
npm run dev src/objects_stream_anthropic.ts
```

## Models Used

- **OpenAI**: `gpt-4o-mini` (generate), `gpt-4o` (stream)
- **Google**: `gemini-2.5-flash`
- **Perplexity**: `llama-3.1-8b-instruct`
- **Anthropic**: `claude-3-5-sonnet-20241022`

## Features

- Text generation and streaming
- Structured object generation with Zod schemas
- Consistent API across different providers
- Environment-based configuration
- TypeScript support 