import { createObjectLikeType } from "unwritten:compiler:ast/types/object.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { lockType } from "unwritten:compiler:utils/ts.js";

import type { ObjectType } from "typescript";

import type { TypeLiteralType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export const createTypeLiteralType = (ctx: CompilerContext, type: ObjectType): TypeLiteralType => lockType(ctx, type, () => {
  const objectType = createObjectLikeType(ctx, type, TypeKind.TypeLiteral);
  return objectType;
});
