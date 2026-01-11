import { genai } from '../ai/gen-ai.js';

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
