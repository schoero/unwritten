import { getIdByType } from "unwritten:compiler/ast/shared/id.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";

import type { StringLiteralType as TSStringLiteralType } from "typescript";

import type { StringLiteralType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


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
