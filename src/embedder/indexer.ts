import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CodeChunk, EmbeddedChunk } from '../types.js';
import { embedText } from './embedder.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STORE_PATH = path.join(__dirname, '../../vector-store.json');

export async function indexChunks(chunks: CodeChunk[]) {
  const embeddedChunks: EmbeddedChunk[] = [];

  for (const chunk of chunks) {
    console.log(`Embedding file path: ${chunk.filePath}`);

    const embedding = await embedText(chunk.content);

    embeddedChunks.push({
      ...chunk,
      embedding,
    });
  }

  fs.writeFileSync(STORE_PATH, JSON.stringify(embeddedChunks, null, 2));
}
