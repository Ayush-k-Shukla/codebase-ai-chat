import cosineSimilarity from 'compute-cosine-similarity';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { embedText } from '../embedder/embedder.js';
import { EmbeddedChunk } from '../types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STORE_PATH = path.join(__dirname, '../../vector-store.json');

export const searchSimilarChunks = async (
  query: string,
  topK = 5
): Promise<EmbeddedChunk[]> => {
  const store: EmbeddedChunk[] = JSON.parse(
    fs.readFileSync(STORE_PATH, 'utf-8')
  );

  const queryEmbedding = await embedText(query);

  const scored = store.map((chunk) => ({
    chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  return scored
    .filter((f) => f.score !== null)
    .sort((a, b) => b?.score! - a?.score!)
    .slice(0, topK)
    .map((s) => s.chunk);
};
