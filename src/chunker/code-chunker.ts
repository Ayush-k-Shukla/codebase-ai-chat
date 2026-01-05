import { chunk } from 'code-chunk';
import crypto from 'crypto';
import { CodeChunk, CodeFile } from '../types.js';

export const chunkCode = async (files: CodeFile[]): Promise<CodeChunk[]> => {
  const chunks: CodeChunk[] = [];

  for (const file of files) {
    try {
      const result = await chunk(file.filePath, file.content, {
        language: file.language === 'java' ? 'java' : 'typescript',
        maxChunkSize: 800,
      });

      for (const piece of result) {
        chunks.push({
          id: crypto
            .createHash('md5')
            .update(file.filePath + piece.context)
            .digest('hex'),
          filePath: file.filePath,
          language: file.language,
          content: piece.contextualizedText,
        });
      }
    } catch (error) {
      console.log(`Chunking failed for file ${file.filePath}`, error);
    }
  }

  return chunks;
};
