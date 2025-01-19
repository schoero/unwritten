import { createObjectLikeType } from "unwritten:interpreter:ast/types/index";
import { withLockedType } from "unwritten:interpreter:utils/ts";
import { TypeKind } from "unwritten:interpreter/enums/type";

import type { ObjectType } from "typescript";

import type { TypeLiteralType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createTypeLiteralType = (ctx: InterpreterContext, type: ObjectType): TypeLiteralType => withLockedType(ctx, type, () => {
  return createObjectLikeType(ctx, type, TypeKind.TypeLiteral);
});
