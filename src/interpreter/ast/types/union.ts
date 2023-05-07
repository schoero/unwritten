import { interpretType } from "unwritten:interpreter:ast/index.js";
import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";

import type { UnionType as TSUnionType } from "typescript";

import type { UnionType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createUnionType(ctx: InterpreterContext, type: TSUnionType): UnionType {

  const typeId = getTypeId(ctx, type);
  const types = type.types.map(type => interpretType(ctx, type));
  const kind = TypeKind.Union;

  return {
    kind,
    typeId,
    types
  };

}
