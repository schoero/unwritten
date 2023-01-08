import { createSourceFileEntity } from "quickdoks:compiler:entities";
import { isSourceFileSymbol } from "quickdoks:compiler:typeguards/symbols.js";
import { assert } from "quickdoks:utils:general.js";

import type { Symbol } from "typescript";

import type { ExportableEntities } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function parse(ctx: CompilerContext, sourceFileSymbol: Symbol): ExportableEntities[] {
  assert(isSourceFileSymbol(sourceFileSymbol), "Source file symbol is not a source file symbol");
  return createSourceFileEntity(ctx, sourceFileSymbol).exports;
}
