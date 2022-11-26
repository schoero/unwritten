import { ObjectType } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Kind, TypeLiteral } from "../../types/types.js";
import { createObjectTypeByType } from "../shared/object-type.js";


export function createTypeLiteralByType(ctx: CompilerContext, type: ObjectType): TypeLiteral {

  const objectType = createObjectTypeByType(ctx, type);
  const kind = Kind.TypeLiteral;

  return {
    ...objectType,
    kind
  };

}
