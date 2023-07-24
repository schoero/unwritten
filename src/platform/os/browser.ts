import type { OS } from "unwritten:type-definitions/os.js";


function getEOL(): string {
  const isWindows = window.navigator.userAgent.toLowerCase().includes("win");
  return isWindows ? "\r\n" : "\n";
}

const os: OS = {
  EOL: getEOL()
};


export const {
  EOL
} = os;

export default os;
