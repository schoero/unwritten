import { parseType } from "unwritten:compiler:entry-points/type.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { getIdByType } from "unwritten:compiler:mixins/id.js";

import type { IntersectionType as TSIntersectionType } from "typescript";

import type { IntersectionType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createIntersectionTypeByType(ctx: CompilerContext, type: TSIntersectionType): IntersectionType {

  const id = getIdByType(ctx, type);
  const types = type.types.map(type => parseType(ctx, type));
  const kind = TypeKind.Intersection;

  return {
    id,
    kind,
    types
  };

}
