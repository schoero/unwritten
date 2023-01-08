import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";
import { isSymbolType } from "quickdoks:compiler:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import type { Type } from "typescript";

import type { SymbolType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createSymbolType(ctx: CompilerContext, type: Type): SymbolType {

  assert(isSymbolType(type), "type is not a symbol type");

  const kind = TypeKind.Symbol;
  const name = "symbol";
  const id = getIdByType(ctx, type);

  return {
    id,
    kind,
    name
  };

}
