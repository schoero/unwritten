import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";

import type { StringLiteralType as TSStringLiteralType } from "typescript";

import type { StringLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createStringLiteralType(ctx: InterpreterContext, type: TSStringLiteralType): StringLiteralType {

  const typeId = getTypeId(ctx, type);
  const value = type.value;
  const name = "string";
  const kind = TypeKind.StringLiteral;

  return {
    kind,
    name,
    typeId,
    value
  };

}
