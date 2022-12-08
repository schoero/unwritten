import { EOL } from "node:os";
import { stdout } from "node:process";


const green = "\x1b[32m";
const yellow = "\x1b[33m";
const red = "\x1b[31m";
const white = "\x1b[37m";
const cyan = "\x1b[36m";

const bgGreen = "\x1b[42m";
const bgYellow = "\x1b[43m";
const bgRed = "\x1b[41m";
const bgCyan = "\x1b[46m";

const reset = "\x1b[0m";

let enabled = true;

export function enableLog() {
  enabled = true;
}

export function disableLog() {
  enabled = false;
}


export function log(message: string) {
  println(`${reset}${message}${reset}`);
}


export function warn(message: string) {
  println(`${bgYellow} WARN: ${reset}${yellow}${message}${reset}`);
}


export function info(message: string) {
  println(`${bgCyan} INFO: ${reset}${cyan}${message}${reset}`);
}


export function error(message: string): Error {
  println(`${red}${message}${reset}`);
}


export function success(message: string) {
  println(`${green}${message}${reset}`);
}


function print(message: string) {
  if(enabled !== true){
    return;
  }
  stdout.write(message);
}


function println(message: string) {
  print(message);
  print(EOL);
}
