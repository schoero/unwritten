import { EOL } from "os";
import { stdout } from "process";

const green = "\x1b[32m";
const yellow = "\x1b[33m";
const red = "\x1b[31m";
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
  println(`${yellow}${message}${reset}`);
}


export function error(message: string): Error {
  return new Error(`${red}${message}${reset}`);
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