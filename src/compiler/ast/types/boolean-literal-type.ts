import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";

import type { LiteralType } from "typescript";

import type { BooleanLiteralType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createBooleanLiteralType(ctx: CompilerContext, type: LiteralType): BooleanLiteralType {

  const id = getIdByType(ctx, type);
  // @ts-expect-error // Alternative way would be to use the typeChecker and typeToString()
  const value = type.intrinsicName === "true";
  const kind = TypeKind.BooleanLiteral;

  return {
    id,
    kind,
    value
  };

}
