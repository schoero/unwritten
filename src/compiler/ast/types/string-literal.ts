import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";

import type { StringLiteralType as TSStringLiteralType } from "typescript";

import type { StringLiteralType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createStringLiteralType(ctx: CompilerContext, type: TSStringLiteralType): StringLiteralType {

  const id = getIdByType(ctx, type);
  const value = type.value;
  const name = "string";
  const kind = TypeKind.StringLiteral;

  return {
    id,
    kind,
    name,
    value
  };
}
