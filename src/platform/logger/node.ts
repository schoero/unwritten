import { stdout } from "node:process";

import { homeDirectory, lineEndings } from "unwritten:platform/os/node";
import { env } from "unwritten:platform/process/node";
import { name, version } from "unwritten:utils/package-json.entry";

import type { WriteStream } from "node:tty";

import type { DefaultContext } from "unwritten:type-definitions/context";
import type { Logger } from "unwritten:type-definitions/platform";


const modifiers = {
  bgCyan: "\x1b[46m",
  bgGreen: "\x1b[42m",
  bgRed: "\x1b[41m",
  bgYellow: "\x1b[43m",
  fgBlack: "\x1b[30m",
  fgBlue: "\x1b[34m",
  fgCyan: "\x1b[36m",
  fgDim: "\x1b[2m",
  fgGray: "\x1b[2m",
  fgGreen: "\x1b[32m",
  fgMagenta: "\x1b[35m",
  fgRed: "\x1b[31m",
  fgWhite: "\x1b[37m",
  fgYellow: "\x1b[33m",
  inverse: "\x1b[7m",
  reset: "\x1b[0m",
  textBold: "\x1b[1m",
  textItalic: "\x1b[3m",
  textStrikethrough: "\x1b[9m",
  textUnderline: "\x1b[4m"
} as const;


export namespace logger {

  process.on("uncaughtException", err => {

    const stackOnly = err.stack?.replace(`${err.name}: ${err.message}`, "");
    const systemInfo = getSystemInfo().map(dim);

    println(
      `${lineEndings}${inverse(red(bold(` ${err.name} `)))} ${
        [
          red(bold(err.message)),
          err.cause,
          stackOnly && red(stackOnly),
          ...systemInfo
        ]
          .filter(message => !!message)
          .join(lineEndings)}`,
      process.stderr
    );

    process.exit(1);

  });


  export function log(message: string): void {
    println(`${modifiers.reset}${message}${modifiers.reset}`);
  }


  export function debug(message: string): void {
    if(env.DEBUG === undefined){
      return;
    }
    println(`${modifiers.reset}${message}${modifiers.reset}`);
  }


  export function warn(message: string): void;
  export function warn(title: string, body: string[]): void;
  export function warn(title: string, badge: string, body: string[]): void;
  export function warn(titleOrMessage: string, badgeOrBody?: string[] | string, bodyOrUndefined?: string[]): void {

    const badge = typeof badgeOrBody === "string" ? badgeOrBody : "WARN";
    const body = typeof badgeOrBody === "object" ? badgeOrBody : bodyOrUndefined;
    const bodyMessages = body
      ? [
        "",
        ...body.map(message => indent(message, 4)),
        ""
      ]
      : [];

    println([
      `${inverse(yellow(bold(` ${badge} `)))} ${yellow(bold(titleOrMessage))}`,
      ...bodyMessages
    ].join(lineEndings));

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
    const formattedRenderer = filePath(renderer);

    const table = simpleTable({
      // eslint-disable-next-line eslint-plugin-typescript/naming-convention
      "renderer:": formattedRenderer,
      // eslint-disable-next-line eslint-plugin-typescript/naming-convention, eslint-plugin-sort-keys/sort-keys-fix
      "entry points:": formattedEntryPoints,
      // eslint-disable-next-line eslint-plugin-typescript/naming-convention
      "tsconfig:": formattedTSConfigPath,
      // eslint-disable-next-line eslint-plugin-typescript/naming-convention
      "unwritten:": formattedUnwrittenPath
    })
      .map(row => indent(row, 4));

    println([
      inverse(green(bold(` ${name} `))),
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

    const bodyMessages = body
      ? [
        "",
        ...body.map(message => indent(message, 4)),
        ""
      ]
      : [];

    println([
      `${inverse(cyan(bold(` ${badge} `)))} ${titleOrMessage}`,
      ...bodyMessages
    ].join(lineEndings));

  }


  export function filePath(path: string): string {

    const cwd = process.cwd();
    const home = homeDirectory();

    if(!path.startsWith(cwd)){
      return path;
    }

    const relativePath = path.replace(cwd, "");
    const simplifiedPath = cwd.replace(new RegExp(`^${home}`), "~");

    return `${modifiers.fgDim}${simplifiedPath}${modifiers.reset}${relativePath}`;

  }

  // colors
  export function red(message: string): string {
    return `${modifiers.fgRed}${message}${modifiers.reset}`;
  }

  export function bgRed(message: string): string {
    return `${modifiers.bgRed}${message}${modifiers.reset}`;
  }

  export function bgGreen(message: string): string {
    return `${modifiers.bgGreen}${message}${modifiers.reset}`;
  }

  export function bgYellow(message: string): string {
    return `${modifiers.bgYellow}${message}${modifiers.reset}`;
  }

  export function gray(message: string): string {
    return `${modifiers.fgGray}${message}${modifiers.reset}`;
  }

  export function green(message: string): string {
    return `${modifiers.fgGreen}${message}${modifiers.reset}`;
  }

  export function yellow(message: string): string {
    return `${modifiers.fgYellow}${message}${modifiers.reset}`;
  }

  export function white(message: string): string {
    return `${modifiers.fgWhite}${message}${modifiers.reset}`;
  }

  export function black(message: string): string {
    return `${modifiers.fgBlack}${message}${modifiers.reset}`;
  }

  export function dim(message: string): string {
    return `${modifiers.fgDim}${message}${modifiers.reset}`;
  }

  export function inverse(message: string): string {
    return `${modifiers.inverse}${message}${modifiers.reset}`;
  }

  export function cyan(message: string): string {
    return `${modifiers.fgCyan}${message}${modifiers.reset}`;
  }

  export function blue(message: string): string {
    return `${modifiers.fgBlue}${message}${modifiers.reset}`;
  }

  export function magenta(message: string): string {
    return `${modifiers.fgMagenta}${message}${modifiers.reset}`;
  }

  export function bold(message: string): string {
    return `${modifiers.textBold}${message}${modifiers.reset}`;
  }

  export function underline(message: string): string {
    return `${modifiers.textUnderline}${message}${modifiers.reset}`;
  }

  export function italic(message: string): string {
    return `${modifiers.textItalic}${message}${modifiers.reset}`;
  }

  export function strikethrough(message: string): string {
    return `${modifiers.textStrikethrough}${message}${modifiers.reset}`;
  }

  export function unstyled(message: string): string {
    return forceUnstyled(message);
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

function indent(message: string, spaces: number): string {
  return message.split(lineEndings).reduce((lines, line, index, arr) => {
    if(index > 0){
      lines += lineEndings;
    }

    return `${lines}${" ".repeat(spaces)}${line}`;
  }, "");
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
  if("NO_COLOR" in process.env || process.argv.includes("--no-color")){
    return false;
  }
  if("GITHUB_ACTIONS" in process.env){
    return false;
  }
  if(!("hasColors" in output) || !output.hasColors(16)){
    return false;
  }

  return true;
}

function forceUnstyled(message: string): string {
  return Object.values(modifiers).reduce((acc, modifier) => {
    return acc.replaceAll(modifier, "");
  }, message);
}

export default logger;
