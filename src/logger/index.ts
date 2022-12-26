import { EOL } from "node:os";
import { stdout } from "node:process";


export class Logger {

  private static _fgGreen = "\x1b[32m";
  private static _fgYellow = "\x1b[33m";
  private static _fgRed = "\x1b[31m";
  private static _fgWhite = "\x1b[37m";
  private static _fgCyan = "\x1b[36m";
  private static _fgGray = "\x1b[90m";

  private static _bgGreen = "\x1b[42m";
  private static _bgYellow = "\x1b[43m";
  private static _bgRed = "\x1b[41m";
  private static _bgCyan = "\x1b[46m";

  private static _bold = "\x1b[1m";
  private static _underline = "\x1b[4m";
  private static _italic = "\x1b[3m";
  private static _strikethrough = "\x1b[9m";

  private static _reset = "\x1b[0m";


  public log(message: string): void {
    this._println(`${Logger._reset}${message}${Logger._reset}`);
  }


  public warn(message: string): void {
    this._println(`${Logger._bgYellow}${Logger._bold} WARN ${Logger._reset} ${this.yellow(message)}`);
  }


  public info(message: string): void {
    this._println(`${Logger._bgCyan}${Logger._bold} INFO ${Logger._reset} ${this.cyan(message)}`);
  }


  public success(message: string): void {
    this._println(`${Logger._fgGreen}${message}${Logger._reset}`);
  }


  //-- Colors

  public red(message: string): string {
    return `${Logger._fgRed}${message}${Logger._reset}`;
  }

  public gray(message: string): string {
    return `${Logger._fgGray}${message}${Logger._reset}`;
  }

  public green(message: string): string {
    return `${Logger._fgGreen}${message}${Logger._reset}`;
  }

  public yellow(message: string): string {
    return `${Logger._fgYellow}${message}${Logger._reset}`;
  }

  public white(message: string): string {
    return `${Logger._fgWhite}${message}${Logger._reset}`;
  }

  public cyan(message: string): string {
    return `${Logger._fgCyan}${message}${Logger._reset}`;
  }

  public bold(message: string): string {
    return `${Logger._bold}${message}${Logger._reset}`;
  }

  public underline(message: string): string {
    return `${Logger._underline}${message}${Logger._reset}`;
  }

  public italic(message: string): string {
    return `${Logger._italic}${message}${Logger._reset}`;
  }

  public strikethrough(message: string): string {
    return `${Logger._strikethrough}${message}${Logger._reset}`;
  }


  //-- Private

  private _print(message: string): void {
    stdout.write(message);
  }

  private _println(message: string): void {
    this._print(message);
    this._print(EOL);
  }

}
