import { IntersectionType as TSIntersectionType } from "typescript";

import { EntityKind, Intersection } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";
import { getTypeByType } from "../compositions/type.js";


export function createIntersectionTypeByType(type: TSIntersectionType): Intersection {

  const id = getIdByType(type);
  const types = type.types.map(getTypeByType);
  const kind = EntityKind.Intersection;

  return {
    id,
    kind,
    types
  };

}