import { EOL as nodeEOL } from "node:os";

import type { OS } from "unwritten:type-definitions/os.js";


const os: OS = {
  EOL: nodeEOL
};

export const {
  EOL
} = os;

export default os;
