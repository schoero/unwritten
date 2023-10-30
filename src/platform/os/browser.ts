import type { OS } from "unwritten:type-definitions/os";


function getEOL(): string {
  try {
    const isWindows = window.navigator.userAgent.toLowerCase().includes("win");
    return isWindows ? "\r\n" : "\n";
  } catch {
    return "\n";
  }
}

const os: OS = {
  homeDirectory: () => "/",
  lineEndings: getEOL()
};


export const {
  homeDirectory,
  lineEndings
} = os;

export default os;
