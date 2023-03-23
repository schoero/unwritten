import { parseType } from "unwritten:interpreter:ast/index.js";
import { getIdByType } from "unwritten:interpreter:ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";

import type { IntersectionType as TSIntersectionType } from "typescript";

import type { IntersectionType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createIntersectionType(ctx: InterpreterContext, type: TSIntersectionType): IntersectionType {

  const id = getIdByType(ctx, type);
  const types = type.types.map(type => parseType(ctx, type));
  const kind = TypeKind.Intersection;

  return {
    id,
    kind,
    types
  };

}
