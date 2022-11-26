import { ObjectType } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Kind, ObjectLiteral } from "../../types/types.js";
import { createObjectTypeByType } from "../shared/object-type.js";


export function createObjectLiteralByType(ctx: CompilerContext, type: ObjectType): ObjectLiteral {

  const objectType = createObjectTypeByType(ctx, type);
  const kind = Kind.ObjectLiteral;

  return {
    ...objectType,
    kind
  };

}
