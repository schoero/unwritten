import { createObjectLikeType } from "unwritten:interpreter/ast/types/object.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { lockType } from "unwritten:interpreter/utils/ts.js";

import type { ObjectType } from "typescript";

import type { ObjectLiteralType } from "unwritten:interpreter/type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export const createObjectLiteralByType = (ctx: InterpreterContext, type: ObjectType): ObjectLiteralType => lockType(ctx, type, () => {
  const fromObjectType = createObjectLikeType(ctx, type, TypeKind.ObjectLiteral);
  return {
    ...fromObjectType
  };
});
