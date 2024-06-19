import { TypeKind } from "unwritten:interpreter/enums/type";
import { withCachedType } from "unwritten:interpreter/utils/ts";
import { getTypeId } from "unwritten:interpreter:ast/shared/id";

import type { LiteralType } from "typescript";

import type { BooleanLiteralType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createBooleanLiteralType = (ctx: InterpreterContext, type: LiteralType): BooleanLiteralType => withCachedType(ctx, type, () => {

  const typeId = getTypeId(ctx, type);
  // @ts-expect-error // Alternative way would be to use the typeChecker and typeToString()
  const value = type.intrinsicName === "true";
  const name = "boolean";
  const kind = TypeKind.BooleanLiteral;

  return {
    kind,
    name,
    typeId,
    value
  };

});
