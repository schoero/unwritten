import { LiteralType } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { BooleanLiteralType, Kind } from "quickdoks:type-definitions/types.d.js";


export function createBooleanLiteralType(ctx: CompilerContext, type: LiteralType): BooleanLiteralType {

  const id = getIdByType(ctx, type);
  // @ts-expect-error // Alternative way would be to use the typeChecker and typeToString()
  const value = type.intrinsicName === "true";
  const kind = Kind.BooleanLiteral;

  return {
    id,
    kind,
    value
  };

}
