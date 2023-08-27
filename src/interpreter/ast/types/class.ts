import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createObjectLikeType } from "unwritten:interpreter:ast/types/index.js";
import { withLockedType } from "unwritten:interpreter:utils/ts.js";

import type { ObjectType } from "typescript";

import type { ClassType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export const createClassType = (ctx: InterpreterContext, type: ObjectType): ClassType => withLockedType(ctx, type, () => {
  const fromObjectType = createObjectLikeType(ctx, type, TypeKind.Class);
  return {
    ...fromObjectType
  };
});
