import { TypeKind } from "unwritten:interpreter/enums/type";
import { createObjectLikeType } from "unwritten:interpreter:ast/types/index";
import { withCachedType, withLockedType } from "unwritten:interpreter:utils/ts";

import type { ObjectType } from "typescript";

import type { ClassType } from "unwritten:interpreter/type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createClassType = (ctx: InterpreterContext, type: ObjectType): ClassType => withCachedType(ctx, type, () => withLockedType(ctx, type, () => {
  return createObjectLikeType(ctx, type, TypeKind.Class);
}));
