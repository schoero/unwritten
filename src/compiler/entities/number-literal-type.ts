import { NumberLiteralType as TSNumberLiteralType } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Kind, NumberLiteralType } from "quickdoks:type-definitions/types.d.js";


export function createNumberLiteralType(ctx: CompilerContext, type: TSNumberLiteralType): NumberLiteralType {

  const id = getIdByType(ctx, type);
  const value = type.value;
  const kind = Kind.NumberLiteral;

  return {
    id,
    kind,
    value
  };

}
