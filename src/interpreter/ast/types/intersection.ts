import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";

import { getTypeByType } from "../type";

import type { IntersectionType as TSIntersectionType } from "typescript";

import type { IntersectionType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createIntersectionType(ctx: InterpreterContext, type: TSIntersectionType): IntersectionType {

  const typeId = getTypeId(ctx, type);
  const types = type.types.map(type => getTypeByType(ctx, type));
  const kind = TypeKind.Intersection;

  return {
    kind,
    typeId,
    types
  };

}
