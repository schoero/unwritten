import { EOL } from "unwritten:utils/system.js";


export module logger {

  export function log(message: string): void {
    console.log(message);
  }

  export function warn(message: string): void;
  export function warn(title: string, body: string[]): void;
  export function warn(title: string, badge: string, body: string[]): void;
  export function warn(titleOrMessage: string, badgeOrBody?: string[] | string, bodyOrUndefined?: string[]): void {
    const badge = typeof badgeOrBody === "string" ? badgeOrBody : "warn";
    const body = typeof badgeOrBody === "object" ? badgeOrBody : bodyOrUndefined;
    const bodyMessages = body ?? [];

    const title = `${badge}: ${titleOrMessage}`;
    const messages = [title, ...bodyMessages].join(EOL);

    console.warn(messages);
  }

  export function info(message: string): void;
  export function info(title: string, body: string[]): void;
  export function info(title: string, badge: string, body: string[]): void;
  export function info(titleOrMessage: string, badgeOrBody?: string[] | string, bodyOrUndefined?: string[]): void {
    const badge = typeof badgeOrBody === "string" ? badgeOrBody : "info";
    const body = typeof badgeOrBody === "object" ? badgeOrBody : bodyOrUndefined;
    const bodyMessages = body ?? [];

    const title = `${badge}: ${titleOrMessage}`;
    const messages = [title, ...bodyMessages].join(EOL);

    console.log(messages);
  }

  export function red(message: string): string {
    return message;
  }

  export function gray(message: string): string {
    return message;
  }

  export function green(message: string): string {
    return message;
  }

  export function yellow(message: string): string {
    return message;
  }

  export function white(message: string): string {
    return message;
  }

  export function cyan(message: string): string {
    return message;
  }

  export function bold(message: string): string {
    return message;
  }

  export function underline(message: string): string {
    return message;
  }

  export function italic(message: string): string {
    return message;
  }

  export function strikethrough(message: string): string {
    return message;
  }

  export function filePath(path: string): string {
    return path;
  }

}
