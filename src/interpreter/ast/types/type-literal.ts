import { createObjectLikeType } from "unwritten:interpreter/ast/types/object.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { lockType } from "unwritten:interpreter/utils/ts.js";

import type { ObjectType } from "typescript";

import type { TypeLiteralType } from "unwritten:interpreter/type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export const createTypeLiteralType = (ctx: InterpreterContext, type: ObjectType): TypeLiteralType => lockType(ctx, type, () => {
  const objectType = createObjectLikeType(ctx, type, TypeKind.TypeLiteral);
  return objectType;
});
