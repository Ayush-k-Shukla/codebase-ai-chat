import fs from 'fs';
import path from 'path';
import type { CodeFile } from '../types.js';

const ALLOWED_EXTENSIONS = ['.js', '.ts', '.java'];
const IGNORE_DIRS = ['node_modules', '.git', 'dist', 'build'];

export const scanRepo = (repoPath: string): CodeFile[] => {
  const results: CodeFile[] = [];

  function walk(currentPath: string) {
    const stats = fs.statSync(currentPath);

    if (stats.isDirectory()) {
      const dirName = path.basename(currentPath);
      if (IGNORE_DIRS.includes(dirName)) return;

      const children = fs.readdirSync(currentPath);
      for (const child of children) {
        walk(path.join(currentPath, child));
      }
    } else {
      const ext = path.extname(currentPath);
      if (!ALLOWED_EXTENSIONS.includes(ext)) return;

      // exclude tests
      if (currentPath.includes('.test.')) return;

      const content = fs.readFileSync(currentPath, 'utf-8');

      results.push({
        filePath: currentPath,
        content,
        language: ext === '.java' ? 'java' : ext === '.ts' ? 'ts' : 'js',
      });
    }
  }

  walk(repoPath);
  return results;
};
