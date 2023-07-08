import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { isSymbolType } from "unwritten:interpreter:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { Type } from "typescript";

import type { SymbolType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createSymbolType(ctx: InterpreterContext, type: Type): SymbolType {

  assert(isSymbolType(type), "type is not a symbol type");

  const kind = TypeKind.Symbol;
  const name = "symbol";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

}
