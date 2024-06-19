import { TypeKind } from "unwritten:interpreter/enums/type";
import { withCachedType } from "unwritten:interpreter/utils/ts";
import { getTypeId } from "unwritten:interpreter:ast/shared/id";
import { isSymbolType } from "unwritten:interpreter:typeguards/types";
import { assert } from "unwritten:utils:general";

import type { Type } from "typescript";

import type { SymbolType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createSymbolType = (ctx: InterpreterContext, type: Type): SymbolType => withCachedType(ctx, type, () => {

  assert(isSymbolType(ctx, type), "type is not a symbol type");

  const kind = TypeKind.Symbol;
  const name = "symbol";
  const typeId = getTypeId(ctx, type);

  return {
    kind,
    name,
    typeId
  };

});
