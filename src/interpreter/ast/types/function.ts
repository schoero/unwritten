import { createSignatureEntity } from "unwritten:interpreter/ast/entities/index.js";
import { getIdByType } from "unwritten:interpreter/ast/shared/id.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";

import type { ObjectType } from "typescript";

import type { FunctionType } from "unwritten:interpreter/type-definitions/types.js";
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
