import { createSignatureEntity } from "quickdoks:compiler:entities";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";

import type { ObjectType } from "typescript";

import type { FunctionType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createFunctionType(ctx: CompilerContext, type: ObjectType): FunctionType {

  const callSignatures = type.getCallSignatures(); // Types with constructSignatures are considered object types
  const signatures = callSignatures.map(signature => createSignatureEntity(ctx, signature));

  const id = getIdByType(ctx, type);

  const kind = TypeKind.FunctionType;

  return {
    id,
    kind,
    signatures
  };

}
