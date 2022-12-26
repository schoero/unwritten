import { ObjectType } from "typescript";

import { lockType } from "quickdoks:compiler/utils/ts.js";
import { createObjectTypeByType } from "quickdoks:compiler:shared/object-type.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, ObjectLiteral } from "quickdoks:types:types.js";


export const createObjectLiteralByType = (ctx: CompilerContext, type: ObjectType): ObjectLiteral => lockType(ctx, type, () => {
  const objectType = createObjectTypeByType(ctx, type, Kind.ObjectLiteral);
  return objectType;
});
