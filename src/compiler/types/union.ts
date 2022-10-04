import { UnionType as TSUnionType } from "typescript";

import { TypeKind, Union } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";
import { getTypeByType } from "../compositions/type.js";


export function createUnionTypeByType(type: TSUnionType): Union {

  const id = getIdByType(type);
  const types = type.types.map(getTypeByType);
  const kind = TypeKind.Union;

  return {
    id,
    kind,
    types
  };

}