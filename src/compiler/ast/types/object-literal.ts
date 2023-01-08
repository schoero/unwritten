import { createObjectLikeType } from "quickdoks:compiler:ast/types/object-type.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { lockType } from "quickdoks:compiler:utils/ts.js";

import type { ObjectType } from "typescript";

import type { ObjectLiteralType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export const createObjectLiteralByType = (ctx: CompilerContext, type: ObjectType): ObjectLiteralType => lockType(ctx, type, () => {
  const fromObjectType = createObjectLikeType(ctx, type, TypeKind.ObjectLiteral);
  return {
    ...fromObjectType
  };
});
