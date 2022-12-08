import { ObjectType } from "typescript";

import { createObjectTypeByType } from "quickdoks:compiler:shared/object-type.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, TypeLiteral } from "quickdoks:types:types.js";


export function createTypeLiteralByType(ctx: CompilerContext, type: ObjectType): TypeLiteral {

  const objectType = createObjectTypeByType(ctx, type);
  const kind = Kind.TypeLiteral;

  return {
    ...objectType,
    kind
  };

}
