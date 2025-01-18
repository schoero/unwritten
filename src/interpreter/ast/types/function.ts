import { createSignatureEntity } from "unwritten:interpreter:ast/entities/index";
import { getTypeId } from "unwritten:interpreter:ast/shared/id";
import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { withCachedType, withLockedType } from "unwritten:interpreter/utils/ts.js";

import type { ObjectType } from "typescript";
import type { FunctionType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createFunctionType = (ctx: InterpreterContext, type: ObjectType): FunctionType => withCachedType(ctx, type, () => withLockedType(ctx, type, () => {

  const callSignatures = type.getCallSignatures(); // Types with constructSignatures are considered object types
  const signatures = callSignatures.map(signature => createSignatureEntity(ctx, signature, EntityKind.FunctionSignature));
  const typeId = getTypeId(ctx, type);

  const kind = TypeKind.Function;

  return {
    kind,
    signatures,
    typeId
  };

}));
