import { lineEndings } from "unwritten:platform/os/browser";
import { env } from "unwritten:platform/process/browser";

import type { DefaultContext } from "unwritten:type-definitions/context";
import type { Logger } from "unwritten:type-definitions/platform";


export module logger {

  export function log(message: string): void {
    console.log(message);
  }

  export function debug(message: string): void {
    if(env.DEBUG === undefined){
      return;
    }
    console.debug(message);
  }

  export function warn(message: string): void;
  export function warn(title: string, message: string[]): void;
  export function warn(title: string, label: string, message: string[]): void;
  export function warn(titleOrMessage: string, labelOrMessage?: string[] | string, messageOrUndefined?: string[]): void {
    const label = typeof labelOrMessage === "string" ? labelOrMessage : "warn";
    const message = typeof labelOrMessage === "object" ? labelOrMessage : messageOrUndefined;

    const title = `${label}: ${titleOrMessage}`;
    const messages = [title, ...message ?? []].join(lineEndings);

    console.warn(messages);
  }

  export function info(message: string): void;
  export function info(title: string, message: string[]): void;
  export function info(title: string, label: string, message: string[]): void;
  export function info(titleOrMessage: string, labelOrMessage?: string[] | string, messageOrUndefined?: string[]): void {
    const label = typeof labelOrMessage === "string" ? labelOrMessage : "info";
    const message = typeof labelOrMessage === "object" ? labelOrMessage : messageOrUndefined;

    const title = `${label}: ${titleOrMessage}`;
    const messages = [title, ...message ?? []].join(lineEndings);

    console.log(messages);
  }

  export function stats(ctx: DefaultContext, stats: Logger["_stats"]): void {

    ctx.dependencies.logger!._stats ??= {};

    const entryPoints = stats?.entryPoints ?? ctx.dependencies.logger!._stats.entryPoints;
    const tsconfig = stats?.tsconfig ?? ctx.dependencies.logger!._stats.tsconfig;
    const unwritten = stats?.unwritten ?? ctx.dependencies.logger!._stats.unwritten;
    const renderer = stats?.renderer ?? ctx.dependencies.logger!._stats.renderer;

    ctx.dependencies.logger!._stats.entryPoints = entryPoints;
    ctx.dependencies.logger!._stats.tsconfig = tsconfig;
    ctx.dependencies.logger!._stats.unwritten = unwritten;
    ctx.dependencies.logger!._stats.renderer = renderer;

    if(!entryPoints || !tsconfig || !unwritten || !renderer){
      return;
    }

    const formattedEntryPoints = entryPoints.map(entryFilePath => filePath(entryFilePath));
    const formattedTSConfigPath = filePath(tsconfig);
    const formattedUnwrittenPath = filePath(unwritten);
    const formattedRenderer = renderer;

    console.log({
      renderer: formattedRenderer,
      // eslint-disable-next-line eslint-plugin-sort-keys/sort-keys-fix
      entryPoints: formattedEntryPoints,
      tsconfig: formattedTSConfigPath,
      unwritten: formattedUnwrittenPath
    });

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

  export function bgGreen(message: string): string {
    return message;
  }

  export function bgRed(message: string): string {
    return message;
  }

  export function bgYellow(message: string): string {
    return message;
  }

  export function blue(message: string): string {
    return message;
  }

  export function magenta(message: string): string {
    return message;
  }

}

export default logger;
