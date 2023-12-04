import { stdout } from "node:process";

import { lineEndings } from "unwritten:platform/os/node";
import { name, version } from "unwritten:utils/package-json.entry";

import type { WriteStream } from "node:tty";

import type { DefaultContext } from "unwritten:type-definitions/context";
import type { Logger } from "unwritten:type-definitions/platform";


const modifiers = {
  bgCyan: "\x1b[46m",
  bgGreen: "\x1b[42m",
  bgRed: "\x1b[41m",
  bgYellow: "\x1b[43m",
  fgCyan: "\x1b[36m",
  fgGray: "\x1b[2m",
  fgGreen: "\x1b[32m",
  fgRed: "\x1b[31m",
  fgWhite: "\x1b[37m",
  fgYellow: "\x1b[33m",
  reset: "\x1b[0m",
  textBold: "\x1b[1m",
  textItalic: "\x1b[3m",
  textStrikethrough: "\x1b[9m",
  textUnderline: "\x1b[4m"
} as const;


export namespace logger {

  const {
    bgCyan,
    bgGreen,
    bgRed,
    bgYellow,
    fgCyan,
    fgGray,
    fgGreen,
    fgRed,
    fgWhite,
    fgYellow,
    reset,
    textBold,
    textItalic,
    textStrikethrough,
    textUnderline
  } = modifiers;

  process.on("uncaughtException", err => {

    const stackOnly = err.stack?.replace(`${err.name}: ${err.message}`, "");
    const systemInfo = getSystemInfo();

    println(
      `${lineEndings}${bgRed}${textBold} ${err.name} ${reset} ${
        red(
          [
            err.message,
            err.cause,
            stackOnly,
            ...systemInfo
          ]
            .filter(message => !!message)
            .join(lineEndings)
        )}`,
      process.stderr
    );

    process.exit(1);

  });


  export function log(message: string): void {
    println(`${reset}${message}${reset}`);
  }


  export function warn(message: string): void;
  export function warn(title: string, body: string[]): void;
  export function warn(title: string, badge: string, body: string[]): void;
  export function warn(titleOrMessage: string, badgeOrBody?: string[] | string, bodyOrUndefined?: string[]): void {

    const badge = typeof badgeOrBody === "string" ? badgeOrBody : "WARN";
    const body = typeof badgeOrBody === "object" ? badgeOrBody : bodyOrUndefined;
    const bodyMessages = body ? ["", ...body.map(message => `    ${message}`), ""] : [];

    println([
      `${bgYellow}${textBold} ${badge} ${reset} ${titleOrMessage}`,
      ...bodyMessages
    ].join(lineEndings));

  }


  export function stats(ctx: DefaultContext, stats: Logger["_stats"]): void {

    ctx.dependencies.logger!._stats ??= {};

    const entryPoints = stats?.entryPoints ?? ctx.dependencies.logger!._stats.entryPoints;
    const tsconfig = stats?.tsconfig ?? ctx.dependencies.logger!._stats.tsconfig;
    const unwritten = stats?.unwritten ?? ctx.dependencies.logger!._stats.unwritten;

    ctx.dependencies.logger!._stats.entryPoints = entryPoints;
    ctx.dependencies.logger!._stats.tsconfig = tsconfig;
    ctx.dependencies.logger!._stats.unwritten = unwritten;

    if(!entryPoints || !tsconfig || !unwritten){
      return;
    }

    const formattedEntryPoints = entryPoints.map(entryFilePath => filePath(entryFilePath));
    const formattedTSConfigPath = filePath(tsconfig);
    const formattedUnwrittenPath = filePath(unwritten);

    const table = simpleTable({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "entry points:": formattedEntryPoints,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "tsconfig:": formattedTSConfigPath,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "unwritten:": formattedUnwrittenPath
    })
      .map(row => `    ${row}`);

    println([
      `${bgGreen}${textBold} ${name} ${reset}`,
      "",
      ...table,
      ""
    ].join(lineEndings));

  }


  export function info(message: string): void;
  export function info(title: string, body: string[]): void;
  export function info(title: string, badge: string, body: string[]): void;
  export function info(titleOrMessage: string, badgeOrBody?: string[] | string, bodyOrUndefined?: string[]): void {

    const badge = typeof badgeOrBody === "string" ? badgeOrBody : "INFO";
    const body = typeof badgeOrBody === "object" ? badgeOrBody : bodyOrUndefined;
    const bodyMessages = body ? ["", ...body.map(message => `    ${message}`), ""] : [];

    println([
      `${bgGreen}${textBold} ${badge} ${reset} ${titleOrMessage}`,
      ...bodyMessages
    ].join(lineEndings));

  }


  export function filePath(path: string): string {
    const cwd = process.cwd();

    if(!path.startsWith(cwd)){
      return path;
    }

    const relativePath = path.replace(cwd, "");
    return `${fgGray}${cwd}${reset}${relativePath}`;
  }

  // Colors
  export function red(message: string): string {
    return `${fgRed}${message}${reset}`;
  }

  export function gray(message: string): string {
    return `${fgGray}${message}${reset}`;
  }

  export function green(message: string): string {
    return `${fgGreen}${message}${reset}`;
  }

  export function yellow(message: string): string {
    return `${fgYellow}${message}${reset}`;
  }

  export function white(message: string): string {
    return `${fgWhite}${message}${reset}`;
  }

  export function cyan(message: string): string {
    return `${fgCyan}${message}${reset}`;
  }

  export function bold(message: string): string {
    return `${textBold}${message}${reset}`;
  }

  export function underline(message: string): string {
    return `${textUnderline}${message}${reset}`;
  }

  export function italic(message: string): string {
    return `${textItalic}${message}${reset}`;
  }

  export function strikethrough(message: string): string {
    return `${textStrikethrough}${message}${reset}`;
  }

}

function getSystemInfo(ctx?: DefaultContext): string[] {

  const systemInfo = [
    `on ${name} v${version}`,
    ...ctx?.dependencies.ts
      ? [`with TypeScript ${ctx.dependencies.ts.version}`]
      : [],
    `on ${process.release.name} ${process.version}`,
    `${process.platform} ${process.arch}`,
    `in ${process.uptime().toFixed(2)}s`
  ].join(", ");

  const indentation = " ".repeat(4);
  const dash = "-".repeat(systemInfo.length);

  return [
    `${indentation}${dash}`,
    `${indentation}${systemInfo}`
  ];

}

function simpleTable(table: { [key: string]: string[] | string; }): string[] {
  const maxLength = Object.keys(table).reduce((acc, key) => {
    return Math.max(acc, key.length);
  }, 0);

  return Object.entries(table).reduce<string[]>((acc, [key, value]) => {
    if(typeof value === "string"){
      const paddedTitle = key.padEnd(maxLength);
      acc.push(`${paddedTitle} ${value}`);
    } else {
      value.forEach((entry, index) => {
        const title = index === 0 ? key : "";
        const paddedTitle = title.padEnd(maxLength);
        acc.push(`${paddedTitle} ${entry}`);
      });
    }
    return acc;
  }, []);
}

function print(message: string, output: WriteStream = stdout): void {
  if(!supportsColor(output)){
    message = forceUnstyled(message);
  }

  output.write(message);
}

function println(message: string, output?: WriteStream): void {
  print(message, output);
  print(lineEndings, output);
}

function supportsColor(output: WriteStream): boolean {
  return "hasColors" in output && output.hasColors(16);
}

function forceUnstyled(message: string): string {
  return Object.values(modifiers).reduce((acc, modifier) => {
    return acc.replaceAll(modifier, "");
  }, message);
}

export default logger;
