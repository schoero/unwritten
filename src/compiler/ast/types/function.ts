import { getIdByType } from "unwritten:compiler/ast/shared/id.js";
import { createSignatureEntity } from "unwritten:compiler:entities";
import { TypeKind } from "unwritten:compiler:enums/types.js";

import type { ObjectType } from "typescript";

import type { FunctionType } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createFunctionType(ctx: CompilerContext, type: ObjectType): FunctionType {

  const callSignatures = type.getCallSignatures(); // Types with constructSignatures are considered object types
  const signatures = callSignatures.map(signature => createSignatureEntity(ctx, signature));

  const id = getIdByType(ctx, type);

  const kind = TypeKind.Function;

  return {
    id,
    kind,
    signatures
  };

}
