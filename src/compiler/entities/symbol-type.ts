import { Type } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { isSymbolType } from "quickdoks:compiler:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Kind, SymbolType } from "quickdoks:type-definitions/types.d.js";


export function createSymbolType(ctx: CompilerContext, type: Type): SymbolType {

  assert(isSymbolType(type), "type is not a symbol type");

  const kind = Kind.Symbol;
  const name = "symbol";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
