import { IntersectionType as TSIntersectionType } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Intersection, TypeKind } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";
import { createTypeByType } from "./type.js";


export function createIntersectionTypeByType(ctx: CompilerContext, type: TSIntersectionType): Intersection {

  const id = getIdByType(ctx, type);
  const types = type.types.map(type => createTypeByType(ctx, type));
  const kind = TypeKind.Intersection;

  return {
    id,
    kind,
    types
  };

}