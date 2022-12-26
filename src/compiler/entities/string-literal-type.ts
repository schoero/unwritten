import { StringLiteralType as TSStringLiteralType } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Kind, StringLiteralType } from "quickdoks:type-definitions/types.d.js";


export function createStringLiteralType(ctx: CompilerContext, type: TSStringLiteralType): StringLiteralType {

  const id = getIdByType(ctx, type);
  const value = type.value;
  const kind = Kind.StringLiteral;

  return {
    id,
    kind,
    value
  };
}
