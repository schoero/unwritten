export type Logger = {
  bold(message: string): string;
  cyan(message: string): string;
  filePath(path: string): string;
  gray(message: string): string ;
  green(message: string): string;
  info(title: string, body: string[]): void;
  info(title: string, badge: string, body: string[]): void;
  info(message: string): void;
  italic(message: string): string;
  log(message: string): void;
  red(message: string): string;
  strikethrough(message: string): string;
  underline(message: string): string;
  warn(message: string): void;
  warn(title: string, badge: string, body: string[]): void;
  warn(title: string, body: string[]): void;
  white(message: string): string ;
  yellow(message: string): string ;
};
