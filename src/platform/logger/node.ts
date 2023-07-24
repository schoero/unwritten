import { stdout } from "node:process";

import { EOL } from "unwritten:platform/os/node.js";

import { name, version } from "unwritten/../package.json";


export namespace logger {

  const _fgGreen = "\x1b[32m";
  const _fgYellow = "\x1b[33m";
  const _fgRed = "\x1b[31m";
  const _fgWhite = "\x1b[37m";
  const _fgCyan = "\x1b[36m";
  const _fgGray = "\x1b[2m";

  const _bgGreen = "\x1b[42m";
  const _bgYellow = "\x1b[43m";
  const _bgRed = "\x1b[41m";
  const _bgCyan = "\x1b[46m";

  const _bold = "\x1b[1m";
  const _underline = "\x1b[4m";
  const _italic = "\x1b[3m";
  const _strikethrough = "\x1b[9m";

  const _reset = "\x1b[0m";


  process.on("uncaughtException", err => {

    const stackOnly = err.stack?.replace(`${err.name}: ${err.message}`, "");
    const systemInfo = getSystemInfo();

    println(`${EOL}${_bgRed}${_bold} ${err.name} ${_reset} ${red([
      err.message,
      err.cause,
      stackOnly,
      ...systemInfo
    ].filter(message => !!message)
      .join(EOL))}`);

    process.exit(1);

  });


  export function log(message: string): void {
    println(`${_reset}${message}${_reset}`);
  }


  export function warn(message: string): void;
  export function warn(title: string, body: string[]): void;
  export function warn(title: string, badge: string, body: string[]): void;
  export function warn(titleOrMessage: string, badgeOrBody?: string[] | string, bodyOrUndefined?: string[]): void {

    const badge = typeof badgeOrBody === "string" ? badgeOrBody : "WARN";
    const body = typeof badgeOrBody === "object" ? badgeOrBody : bodyOrUndefined;
    const bodyMessages = body ? ["", ...body.map(message => `    ${message}`), ""] : [];

    println([
      `${_bgYellow}${_bold} ${badge} ${_reset} ${titleOrMessage}`,
      ...bodyMessages
    ].join(EOL));

  }


  export function info(message: string): void;
  export function info(title: string, body: string[]): void;
  export function info(title: string, badge: string, body: string[]): void;
  export function info(titleOrMessage: string, badgeOrBody?: string[] | string, bodyOrUndefined?: string[]): void {

    const badge = typeof badgeOrBody === "string" ? badgeOrBody : "INFO";
    const body = typeof badgeOrBody === "object" ? badgeOrBody : bodyOrUndefined;
    const bodyMessages = body ? ["", ...body.map(message => `    ${message}`), ""] : [];

    println([
      `${_bgGreen}${_bold} ${badge} ${_reset} ${titleOrMessage}`,
      ...bodyMessages
    ].join(EOL));

  }


  export function filePath(path: string): string {
    const cwd = process.cwd();
    const relativePath = path.replace(cwd, "");
    return `${_fgGray}${cwd}${_reset}${relativePath}`;
  }

  // Colors
  export function red(message: string): string {
    return `${_fgRed}${message}${_reset}`;
  }

  export function gray(message: string): string {
    return `${_fgGray}${message}${_reset}`;
  }

  export function green(message: string): string {
    return `${_fgGreen}${message}${_reset}`;
  }

  export function yellow(message: string): string {
    return `${_fgYellow}${message}${_reset}`;
  }

  export function white(message: string): string {
    return `${_fgWhite}${message}${_reset}`;
  }

  export function cyan(message: string): string {
    return `${_fgCyan}${message}${_reset}`;
  }

  export function bold(message: string): string {
    return `${_bold}${message}${_reset}`;
  }

  export function underline(message: string): string {
    return `${_underline}${message}${_reset}`;
  }

  export function italic(message: string): string {
    return `${_italic}${message}${_reset}`;
  }

  export function strikethrough(message: string): string {
    return `${_strikethrough}${message}${_reset}`;
  }

}

function getSystemInfo(): string[] {
  const indentation = " ".repeat(4);
  const systemInfo = `on ${name} v${version}, ${process.release.name} ${process.version}, ${process.platform} ${process.arch}, in ${process.uptime().toFixed(2)}s`;
  const dash = "-".repeat(systemInfo.length);
  return [
    `${indentation}${dash}`,
    `${indentation}${systemInfo}`
  ];
}

function print(message: string): void {
  stdout.write(message);
}

function println(message: string): void {
  print(message);
  print(EOL);
}

export default logger;
