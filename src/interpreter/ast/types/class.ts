import { createObjectLikeType } from "unwritten:interpreter/ast/types/object.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { lockType } from "unwritten:interpreter/utils/ts.js";

import type { ObjectType } from "typescript";

import type { ClassType } from "unwritten:interpreter/type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export const createClassType = (ctx: InterpreterContext, type: ObjectType): ClassType => lockType(ctx, type, () => {
  const fromObjectType = createObjectLikeType(ctx, type, TypeKind.Class);
  return {
    ...fromObjectType
  };
});
