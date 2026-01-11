import { genai } from '../ai/gen-ai.js';
import { EmbeddedChunk } from '../types.js';

export async function answerQuestion(
  question: string,
  chunks: EmbeddedChunk[]
): Promise<string> {
  const codeContext = chunks
    .map((c, idx) => `### File: ${c.filePath}\n### ${c.content}`)
    .join('\n\n');

  const prompt = `
        You are a Lead software engineer.

        Answer the user's question using ONLY the provided code context.
        If the answer is not present in the code, say:
        "Not found in the provided codebase."

        Be concise and technical.

        Code Context:
        ${codeContext}

        Question:
        ${question}
`;

  const result = await genai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });
  return result.text ?? '';
}
