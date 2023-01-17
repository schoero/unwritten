import { createObjectLikeType } from "quickdoks:compiler:ast/types/object.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { lockType } from "quickdoks:compiler:utils/ts.js";

import type { ObjectType } from "typescript";

import type { TypeLiteralType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export const createTypeLiteralType = (ctx: CompilerContext, type: ObjectType): TypeLiteralType => lockType(ctx, type, () => {
  const objectType = createObjectLikeType(ctx, type, TypeKind.TypeLiteral);
  return objectType;
});
