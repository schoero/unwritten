import { Symbol } from "typescript";

import { createSourceFileBySymbol } from "quickdoks:compiler:entities/source-file.js";
import { isSourceFileSymbol } from "quickdoks:compiler:typeguards/symbols.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { ExportableTypes } from "quickdoks:types:types.js";
import { assert } from "quickdoks:utils:general.js";


export function parse(ctx: CompilerContext, sourceFileSymbol: Symbol): ExportableTypes[] {
  assert(isSourceFileSymbol(sourceFileSymbol), "Source file symbol is not a source file symbol");
  return createSourceFileBySymbol(ctx, sourceFileSymbol).exports;
}
