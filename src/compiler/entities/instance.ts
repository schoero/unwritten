import { TypeReference } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Instance, Kind } from "../../types/types.js";
import { getNameByType } from "../compositions/name.js";
import { createTypeReferenceByType } from "./type-reference.js";


export function createInstanceByType(ctx: CompilerContext, type: TypeReference): Instance {

  const fromReference = createTypeReferenceByType(ctx, type);
  const name = getNameByType(ctx, type);
  const kind = Kind.Instance;

  return {
    ...fromReference,
    kind,
    name
  };

}
