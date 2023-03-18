import { getIdByType } from "unwritten:interpreter:ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { isSymbolType } from "unwritten:interpreter:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { SymbolType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createSymbolType(ctx: InterpreterContext, type: Type): SymbolType {

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
