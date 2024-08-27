import { homedir, EOL as nodeEOL } from "node:os";

import type { OS } from "unwritten:type-definitions/platform";


const os: OS = {
  homeDirectory: homedir,
  lineEndings: nodeEOL
};

export const {
  homeDirectory,
  lineEndings
} = os;

export default os;
