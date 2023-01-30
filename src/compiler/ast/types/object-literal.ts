import { createObjectLikeType } from "unwritten:compiler:ast/types/object.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { lockType } from "unwritten:compiler:utils/ts.js";

import type { ObjectType } from "typescript";

import type { ObjectLiteralType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export const createObjectLiteralByType = (ctx: CompilerContext, type: ObjectType): ObjectLiteralType => lockType(ctx, type, () => {
  const fromObjectType = createObjectLikeType(ctx, type, TypeKind.ObjectLiteral);
  return {
    ...fromObjectType
  };
});
