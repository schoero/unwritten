import { createObjectLikeType } from "unwritten:compiler:ast/types/object.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { lockType } from "unwritten:compiler:utils/ts.js";

import type { ObjectType } from "typescript";

import type { ClassType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export const createClassType = (ctx: CompilerContext, type: ObjectType): ClassType => lockType(ctx, type, () => {
  const fromObjectType = createObjectLikeType(ctx, type, TypeKind.Class);
  return {
    ...fromObjectType
  };
});
