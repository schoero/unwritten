import { createObjectLikeType } from "unwritten:interpreter:ast/types/index";
import { withCachedType, withLockedType } from "unwritten:interpreter:utils/ts";
import { TypeKind } from "unwritten:interpreter/enums/type";

import type { ObjectType } from "typescript";
import type { ObjectLiteralType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createObjectLiteralByType = (ctx: InterpreterContext, type: ObjectType): ObjectLiteralType => withCachedType(ctx, type, () => withLockedType(ctx, type, () => {
  const fromObjectType = createObjectLikeType(ctx, type, TypeKind.ObjectLiteral);
  return {
    ...fromObjectType
  };
}));
