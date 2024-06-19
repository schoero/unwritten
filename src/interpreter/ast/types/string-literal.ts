import { TypeKind } from "unwritten:interpreter/enums/type";
import { withCachedType } from "unwritten:interpreter/utils/ts";
import { getTypeId } from "unwritten:interpreter:ast/shared/id";

import type { StringLiteralType as TSStringLiteralType } from "typescript";

import type { StringLiteralType } from "unwritten:interpreter/type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createStringLiteralType = (ctx: InterpreterContext, type: TSStringLiteralType): StringLiteralType => withCachedType(ctx, type, () => {

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

});
