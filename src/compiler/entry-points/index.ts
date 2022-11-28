import { Symbol } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { ExportableTypes } from "../../types/types.js";
import { assert } from "../../utils/general.js";
import { createSourceFileBySymbol } from "../entities/source-file.js";
import { isSourceFileSymbol } from "../typeguards/symbols.js";


export function parse(ctx: CompilerContext, sourceFileSymbol: Symbol): ExportableTypes[] {
  assert(isSourceFileSymbol(sourceFileSymbol), "Source file symbol is not a source file symbol");
  return createSourceFileBySymbol(ctx, sourceFileSymbol).exports;
}
