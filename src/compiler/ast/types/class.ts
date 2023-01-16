import { createObjectLikeType } from "quickdoks:compiler/ast/types/object.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { lockType } from "quickdoks:compiler:utils/ts.js";

import type { ObjectType } from "typescript";

import type { ClassType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export const createClassType = (ctx: CompilerContext, type: ObjectType): ClassType => lockType(ctx, type, () => {
  const fromObjectType = createObjectLikeType(ctx, type, TypeKind.ClassType);
  return {
    ...fromObjectType
  };
});
