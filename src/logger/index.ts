import { EOL } from "node:os";
import { stdout } from "node:process";


export module Logger {

  const _fgGreen = "\x1b[32m";
  const _fgYellow = "\x1b[33m";
  const _fgRed = "\x1b[31m";
  const _fgWhite = "\x1b[37m";
  const _fgCyan = "\x1b[36m";
  const _fgGray = "\x1b[90m";

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
    println(`${_bgRed}${_bold} ERROR ${_reset} ${red(err.message + EOL + (err.stack ?? ""))}`);
    process.exit(1);
  });


  export function log(message: string): void {
    println(`${_reset}${message}${_reset}`);
  }


  export function warn(message: string): void {
    println(`${_bgYellow}${_bold} WARN ${_reset} ${yellow(message)}`);
  }


  export function info(message: string): void {
    println(`${_bgCyan}${_bold} INFO ${_reset} ${cyan(message)}`);
  }


  export function success(message: string): void {
    println(`${_fgGreen}${message}${_reset}`);
  }


  //-- Colors

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


function print(message: string): void {
  stdout.write(message);
}

function println(message: string): void {
  print(message);
  print(EOL);
}
