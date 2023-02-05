import { getIdByType } from "unwritten:compiler/ast/shared/id.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { isSymbolType } from "unwritten:compiler:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { SymbolType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


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
