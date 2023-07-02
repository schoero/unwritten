import { EOL as NodeEOL } from "node:os";


export const EOL = getEOL();

function getEOL(): string {

  if(isBrowser()){
    const isWindows = navigator.userAgent.toLowerCase().includes("win");
    return isWindows ? "\r\n" : "\n";
  }

  if(isNode()){
    return NodeEOL;
  }

  return "\n";

}


function isBrowser(): boolean {
  return typeof window === "object" && typeof window.document !== "undefined";
}

function isNode(): boolean {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return typeof process === "object" && typeof process?.versions?.node === "string";
}
