import { IntersectionType as TSIntersectionType } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { IntersectionType, Kind } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";
import { parseType } from "../entry-points/type.js";


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
