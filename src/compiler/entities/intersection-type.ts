import { IntersectionType as TSIntersectionType } from "typescript";

import { getIdByType } from "quickdoks:compiler:compositions/id.js";
import { parseType } from "quickdoks:compiler:entry-points/type.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { IntersectionType, Kind } from "quickdoks:type-definitions/types.d.js";


export function createIntersectionTypeByType(ctx: CompilerContext, type: TSIntersectionType): IntersectionType {

  const id = getIdByType(ctx, type);
  const types = type.types.map(type => parseType(ctx, type));
  const kind = Kind.IntersectionType;

  return {
    id,
    kind,
    types
  };

}
