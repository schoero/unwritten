import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";

import type { NumberLiteralType as TSNumberLiteralType } from "typescript";

import type { NumberLiteralType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createNumberLiteralType(ctx: CompilerContext, type: TSNumberLiteralType): NumberLiteralType {

  const id = getIdByType(ctx, type);
  const value = type.value;
  const kind = TypeKind.NumberLiteral;

  return {
    id,
    kind,
    value
  };

}
