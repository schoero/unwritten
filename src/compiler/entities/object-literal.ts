import { ObjectType } from "typescript";

import { createObjectTypeByType } from "quickdoks:compiler:shared/object-type.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, ObjectLiteral } from "quickdoks:types:types.js";


export function createObjectLiteralByType(ctx: CompilerContext, type: ObjectType): ObjectLiteral {

  const objectType = createObjectTypeByType(ctx, type);
  const kind = Kind.ObjectLiteral;

  return {
    ...objectType,
    kind
  };

}
