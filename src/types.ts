export interface CodeFile {
  filePath: string;
  content: string;
  language: 'js' | 'ts' | 'java';
}

export interface CodeChunk {
  id: string;
  filePath: string;
  language: 'js' | 'ts' | 'java';
  content: string;
}
