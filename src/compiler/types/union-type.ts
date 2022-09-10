import { UnionType as TSUnionType } from "typescript";


import { EntityKind, UnionType } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";
import { getTypeByType } from "../compositions/type.js";


export function createUnionTypeByType(type: TSUnionType): UnionType {

  const id = getIdByType(type);
  const types = type.types.map(getTypeByType);
  const kind = EntityKind.Union;

  return {
    id,
    kind,
    types
  };

}