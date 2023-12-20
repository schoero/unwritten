import type { DefaultContext } from "unwritten:type-definitions/context";


export type Platform = "browser" | "node";

// os
export interface OS {
  homeDirectory(): string;
  lineEndings: string;
}

// process
export interface Process {
  /** Returns the current working directory. */
  cwd(): string;
}

// path
export interface Path {
  /** Resolves the absolute path based on the base path. */
  absolute(to: string): string;
  absolute(from: string, to: string): string;
  /** Returns the directory including a trailing slash. */
  getDirectory(path: string): string;
  /**
   * Returns the file extension including the period.
   * Returns an empty string if the path doesn't contain a file.
   */
  getFileExtension(path: string): string;
  /**
   * Returns the file name including the extension by default.
   * Returns an empty string if the path doesn't contain a file.
   */
  getFileName(path: string, includeExtension?: boolean): string;
  /** Joins multiple segments. */
  join(...segments: string[]): string;
  /** Strips file protocol prefix and converts windows style paths to posix style paths. */
  normalize(path: string): string;
  /** Returns the relative path from one path to the other. */
  relative(from: string, to: string): string;
}

// logger
export type Logger = {
  bold(message: string): string;
  cyan(message: string): string;
  filePath(path: string): string;
  gray(message: string): string;
  green(message: string): string;
  info(message: string[] | string): void;
  info(title: string, message: string[] | string): void;
  info(title: string, label: string, message: string[] | string): void;
  italic(message: string): string;
  log(message: string): void;
  red(message: string): string;
  stats(ctx: DefaultContext, stats: Logger["_stats"]): void;
  strikethrough(message: string): string;
  underline(message: string): string;
  warn(message: string[] | string): void;
  warn(title: string, message: string[] | string): void;
  warn(title: string, label: string, message: string[] | string): void;
  white(message: string): string;
  yellow(message: string): string;
  _stats?: {
    entryPoints?: string[];
    tsconfig?: string;
    unwritten?: string;
  };
};

// fs
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
