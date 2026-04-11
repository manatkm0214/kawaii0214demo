import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

type Provider = "openai" | "gemini";

type RequestBody = {
  provider?: Provider;
  prompt?: string;
  characterName?: string;
  theme?: "dark" | "light";
};

function buildPrompt(body: RequestBody) {
  const prompt = body.prompt?.trim() || "";
  const characterName = body.characterName?.trim();
  const themeNote =
    body.theme === "dark"
      ? "dark elegant accent with jewel-like highlights and cinematic lighting"
      : "bright airy accent with soft sparkle and premium studio lighting";

  return [
    "Create one high-quality character portrait for a household-budget app.",
    "Single character only.",
    "Bust-up composition, centered, clean background.",
    "Use a semi-realistic stylized illustration style with natural facial proportions, realistic skin shading, detailed hair strands, and polished fashion editorial rendering.",
    "Keep the result cute and elegant, but less exaggerated than classic anime.",
    "Prefer elegant but slightly flashy styling with ribbons, frills, jewel accents, and a premium idol-like look.",
    "When the character is feminine, favor long twin-tails with more realistic hair flow and refined layered bangs.",
    "Avoid chibi proportions, overly flat cel shading, and excessively oversized anime eyes.",
    "No text, no watermark, no extra hands, no collage.",
    "Cute polished mobile-app visual, safe for all ages.",
    `Visual mood: ${themeNote}.`,
    characterName ? `Character name or concept: ${characterName}.` : "",
    prompt
      ? `User request: ${prompt}.`
      : "User request: semi-realistic elegant girl with slightly flashy fashion, realistic twin-tails, refined facial detail, and a premium idol portrait feel.",
  ]
    .filter(Boolean)
    .join(" ");
}

function extractGeminiInlineData(response: unknown) {
  if (!response || typeof response !== "object") return null;
  const responseRecord = response as Record<string, unknown>;
  const candidates = responseRecord.candidates;
  if (!Array.isArray(candidates) || candidates.length === 0) return null;

  const firstCandidate = candidates[0];
  if (!firstCandidate || typeof firstCandidate !== "object") return null;
  const content = (firstCandidate as Record<string, unknown>).content;
  if (!content || typeof content !== "object") return null;
  const parts = (content as Record<string, unknown>).parts;
  if (!Array.isArray(parts)) return null;

  for (const part of parts) {
    if (!part || typeof part !== "object") continue;
    const partRecord = part as Record<string, unknown>;
    const inlineData = partRecord.inlineData;
    if (!inlineData || typeof inlineData !== "object") continue;
    const data = (inlineData as Record<string, unknown>).data;
    const mimeType = (inlineData as Record<string, unknown>).mimeType;
    if (typeof data === "string" && typeof mimeType === "string") {
      return { data, mimeType };
    }
  }

  return null;
}

async function generateWithOpenAI(prompt: string) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const client = new OpenAI({ apiKey });
  const model = process.env.OPENAI_IMAGE_MODEL?.trim() || "gpt-image-1";
  const result = await client.images.generate({
    model,
    prompt,
    size: "1024x1024",
    quality: "high",
    output_format: "png",
  });

  const imageBase64 = result.data?.[0]?.b64_json;
  if (!imageBase64) {
    throw new Error("OpenAI did not return an image.");
  }

  return {
    imageUrl: `data:image/png;base64,${imageBase64}`,
    model,
  };
}

async function generateWithGemini(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const client = new GoogleGenerativeAI(apiKey);
  const model = process.env.GEMINI_IMAGE_MODEL?.trim() || "gemini-3.1-flash-image-preview";
  const generator = client.getGenerativeModel({ model });
  const result = await generator.generateContent(prompt);
  const inlineData = extractGeminiInlineData(result.response);

  if (!inlineData) {
    throw new Error("Gemini did not return an image.");
  }

  return {
    imageUrl: `data:${inlineData.mimeType};base64,${inlineData.data}`,
    model,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RequestBody;
    const provider: Provider = body.provider === "openai" ? "openai" : "gemini";
    const prompt = buildPrompt(body);

    const generated =
      provider === "openai"
        ? await generateWithOpenAI(prompt)
        : await generateWithGemini(prompt);

    return NextResponse.json({
      imageUrl: generated.imageUrl,
      provider,
      model: generated.model,
      prompt,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Image generation failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
