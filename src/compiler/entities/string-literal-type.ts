import { StringLiteralType as TSStringLiteralType } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, StringLiteralType } from "quickdoks:types:types.js";


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
