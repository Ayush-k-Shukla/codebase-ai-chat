export interface CodeFile {
  filePath: string;
  content: string;
  language: 'js' | 'ts' | 'java' | 'py';
}
