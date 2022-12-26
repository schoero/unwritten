import { ObjectType } from "typescript";

import { lockType } from "quickdoks:compiler/utils/ts.js";
import { createObjectTypeByType } from "quickdoks:compiler:shared/object-type.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Kind, TypeLiteral } from "quickdoks:type-definitions/types.d.js";


export const createTypeLiteralByType = (ctx: CompilerContext, type: ObjectType): TypeLiteral => lockType(ctx, type, () => {
  const objectType = createObjectTypeByType(ctx, type, Kind.TypeLiteral);
  return objectType;
});
