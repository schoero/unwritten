import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";

import type { IntersectionType as TSIntersectionType } from "typescript";

import type { IntersectionType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createIntersectionTypeByType(ctx: CompilerContext, type: TSIntersectionType): IntersectionType {

  const id = getIdByType(ctx, type);
  const types = type.types.map(type => parseType(ctx, type));
  const kind = TypeKind.IntersectionType;

  return {
    id,
    kind,
    types
  };

}
