import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";

import type { LiteralType } from "typescript";

import type { BooleanLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createBooleanLiteralType(ctx: InterpreterContext, type: LiteralType): BooleanLiteralType {

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

}
