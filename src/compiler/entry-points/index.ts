import { Symbol } from "typescript";

import { createSourceFileBySymbol } from "quickdoks:compiler/entities/index.js";
import { isSourceFileSymbol } from "quickdoks:compiler:typeguards/symbols.js";
import { assert } from "quickdoks:utils:general.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { ExportableTypes } from "quickdoks:type-definitions/types.d.js";


export function parse(ctx: CompilerContext, sourceFileSymbol: Symbol): ExportableTypes[] {
  assert(isSourceFileSymbol(sourceFileSymbol), "Source file symbol is not a source file symbol");
  return createSourceFileBySymbol(ctx, sourceFileSymbol).exports;
}
