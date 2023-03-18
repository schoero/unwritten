import { parseType } from "unwritten:interpreter/ast/index.js";
import { getIdByType } from "unwritten:interpreter/ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";

import type { UnionType as TSUnionType } from "typescript";

import type { UnionType } from "unwritten:interpreter/type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createUnionTypeByType(ctx: InterpreterContext, type: TSUnionType): UnionType {

  const id = getIdByType(ctx, type);
  const types = type.types.map(type => parseType(ctx, type));
  const kind = TypeKind.Union;

  return {
    id,
    kind,
    types
  };

}
