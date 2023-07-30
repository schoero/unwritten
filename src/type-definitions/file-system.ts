export type FileExtension = `.${string}`;
export type FileName = `${string}${FileExtension}`;
export type FilePath = `${Directory}${FileName}` | `${FileName}`;
export type Directory = `${string}/`;

export interface FileSystem {
  existsSync(path: string): boolean;
  mkdirSync(path: string, options?: { recursive: boolean; }): void;
  readFileSync(path: string): string;
  readdirSync(path: string, options?: { recursive: boolean; }): string[];
  rmSync(path: string, options?: { recursive: boolean; }): void;
  writeFileSync(path: string, data: string): void;
}
