import { GoogleGenAI } from '@google/genai';

import 'dotenv/config';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genai = new GoogleGenAI({ apiKey: GEMINI_API_KEY! });

export const embedText = async (text: string): Promise<number[]> => {
  const result = await genai.models.embedContent({
    model: 'gemini-embedding-001',
    contents: text,
  });
  const embeddings = result?.embeddings?.map((e) => e.values) ?? [];

  console.log(
    `Embedding size: ${embeddings.length} for text length: ${text.length}`
  );

  return embeddings[0]!;
};
