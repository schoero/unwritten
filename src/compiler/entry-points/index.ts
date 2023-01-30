import { createSourceFileEntity } from "unwritten:compiler:entities";
import { isSourceFileSymbol } from "unwritten:compiler:typeguards/symbols.js";
import { assert } from "unwritten:utils:general.js";

import type { Symbol } from "typescript";

import type { ExportableEntities } from "unwritten:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function parse(ctx: CompilerContext, sourceFileSymbol: Symbol): ExportableEntities[] {
  assert(isSourceFileSymbol(sourceFileSymbol), "Source file symbol is not a source file symbol");
  return createSourceFileEntity(ctx, sourceFileSymbol).exports;
}
