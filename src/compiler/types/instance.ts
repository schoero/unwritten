import { TypeReference } from "typescript";

import { Instance, TypeKind } from "../../types/types.js";
import { createTypeReferenceByType } from "./reference.js";


export function createInstanceByType(type: TypeReference): Instance {

  const fromReference = createTypeReferenceByType(type);
  const kind = TypeKind.Instance;

  return {
    ...fromReference,
    kind
  };

}