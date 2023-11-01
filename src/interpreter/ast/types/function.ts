import { TypeKind } from "unwritten:interpreter/enums/type";
import { createSignatureEntity } from "unwritten:interpreter:ast/entities/index";
import { getTypeId } from "unwritten:interpreter:ast/shared/id";

import type { ObjectType } from "typescript";

import type { FunctionType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createFunctionType(ctx: InterpreterContext, type: ObjectType): FunctionType {

  const callSignatures = type.getCallSignatures(); // Types with constructSignatures are considered object types
  const signatures = callSignatures.map(signature => createSignatureEntity(ctx, signature));
  const typeId = getTypeId(ctx, type);

  const kind = TypeKind.Function;

  return {
    kind,
    signatures,
    typeId
  };

}
