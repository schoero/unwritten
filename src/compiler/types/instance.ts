import { TypeReference } from "typescript";

import { EntityKind, Instance } from "../../types/types.js";
import { createTypeReferenceByType } from "./reference.js";


export function createInstanceByType(type: TypeReference): Instance {

  const fromReference = createTypeReferenceByType(type);
  const kind = EntityKind.Instance;

  return {
    ...fromReference,
    kind
  };

}