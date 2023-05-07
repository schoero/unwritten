import ts from "typescript";

import { interpretType } from "unwritten:interpreter:ast/index.js";
import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { getNameByDeclaration } from "unwritten:interpreter:ast/shared/name.js";
import { getPositionByNode } from "unwritten:interpreter:ast/shared/position.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { isTupleTypeReferenceType } from "unwritten:interpreter:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { TupleTypeNode, TupleTypeReference, Type } from "typescript";

import type { TupleMemberEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { TupleType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createTupleTypeByTypeReference(ctx: InterpreterContext, typeReference: TupleTypeReference): TupleType {

  const node = typeReference.node;
  const members = getMembers(ctx, typeReference, typeReference.typeArguments);
  const position = node && getPositionByNode(ctx, node);
  const id = getTypeId(ctx, typeReference);
  const kind = TypeKind.Tuple;

  return {
    kind,
    members,
    position,
    typeId: id
  };

}


export function createTupleByTupleTypeNode(ctx: InterpreterContext, tupleTypeNode: TupleTypeNode): TupleType {
  const type = ctx.checker.getTypeFromTypeNode(tupleTypeNode);
  assert(isTupleTypeReferenceType(type), "Type is not a type reference");
  return createTupleTypeByTypeReference(ctx, type);
}


function getMembers(ctx: InterpreterContext, tupleTypeReference: TupleTypeReference, typeArguments?: readonly Type[]) {

  const members = typeArguments?.map((typeArgument, index) => {

    const type = interpretType(ctx, typeArgument);

    const typeId = getTypeId(ctx, typeArgument);
    const elementFlag = tupleTypeReference.target.elementFlags[index];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const optional = (elementFlag && elementFlag & ts.ElementFlags.Optional) !== 0;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const rest = (elementFlag && elementFlag & ts.ElementFlags.Rest) !== 0;
    const labelDeclaration = tupleTypeReference.target.labeledElementDeclarations?.[index];
    const name = labelDeclaration && getNameByDeclaration(ctx, labelDeclaration);
    const kind = EntityKind.TupleMember;

    return <TupleMemberEntity>{
      kind,
      name,
      optional,
      rest,
      type,
      typeId
    };

  });

  return members ?? [];

}
