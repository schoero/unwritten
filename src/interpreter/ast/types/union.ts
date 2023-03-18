import { getIdByType } from "unwritten:interpreter/ast/shared/id.js";
import { parseType } from "unwritten:interpreter/ast/index.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";

import type { UnionType as TSUnionType } from "typescript";

import type { UnionType } from "unwritten:interpreter/type-definitions/types.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createUnionTypeByType(ctx: CompilerContext, type: TSUnionType): UnionType {

  const id = getIdByType(ctx, type);
  const types = type.types.map(type => parseType(ctx, type));
  const kind = TypeKind.Union;

  return {
    id,
    kind,
    types
  };

}
