import { EntityKind } from "unwritten:interpreter/enums/entity";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { isOptionalTypeNode, isRestTypeNode } from "unwritten:interpreter/typeguards/type-nodes";
import { getSymbolId, getTypeId } from "unwritten:interpreter:ast/shared/id";
import { getNameByDeclaration, getNameByTypeNode } from "unwritten:interpreter:ast/shared/name";
import { getPositionByNode, getPositionByType } from "unwritten:interpreter:ast/shared/position";
import { isNamedTupleMember, isTupleTypeReferenceType } from "unwritten:interpreter:typeguards/types";
import { assert } from "unwritten:utils:general";

import { getTypeByType, getTypeByTypeNode } from "../type";

import type { NamedTupleMember, TupleTypeNode, TupleTypeReference, TypeNode } from "typescript";

import type { TupleMemberEntity } from "unwritten:interpreter/type-definitions/entities";
import type { TupleType } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function createTupleTypeByTypeReference(ctx: InterpreterContext, typeReference: TupleTypeReference): TupleType {

  const { ts } = ctx.dependencies;

  const tupleType = typeReference.target;

  const members = typeReference.typeArguments?.map((typeArgument, index) => {

    const type = getTypeByType(ctx, typeArgument);

    // eslint-disable-next-line eslint-plugin-typescript/no-unnecessary-condition
    const symbolId = typeArgument.symbol && getSymbolId(ctx, typeArgument.symbol);
    const typeId = getTypeId(ctx, typeArgument);
    const elementFlag = typeReference.target.elementFlags[index];
    // eslint-disable-next-line eslint-plugin-typescript/no-unnecessary-condition
    const optional = (elementFlag && elementFlag & ts.ElementFlags.Optional) !== 0;
    // eslint-disable-next-line eslint-plugin-typescript/no-unnecessary-condition
    const rest = (elementFlag && elementFlag & ts.ElementFlags.Rest) !== 0;
    const labelDeclaration = typeReference.target.labeledElementDeclarations?.[index];
    const name = labelDeclaration && getNameByDeclaration(ctx, labelDeclaration);
    const kind = EntityKind.TupleMember;

    return <TupleMemberEntity>{
      kind,
      name,
      optional,
      rest,
      symbolId,
      type,
      typeId
    };

  }) ?? [];

  const position = getPositionByType(ctx, tupleType);
  const typeId = getTypeId(ctx, tupleType);
  const kind = TypeKind.Tuple;

  return {
    kind,
    members,
    position,
    typeId
  };

}


export function createTupleByTupleTypeNode(ctx: InterpreterContext, typeNode: TupleTypeNode): TupleType {

  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  assert(isTupleTypeReferenceType(ctx, type), "Type is not a type reference");

  const members = typeNode.elements.map(element => createTupleTypeMemberByTypeNode(ctx, element));
  const position = getPositionByNode(ctx, typeNode);
  const typeId = getTypeId(ctx, type);
  const kind = TypeKind.Tuple;

  return {
    kind,
    members,
    position,
    typeId
  };

}


function createTupleTypeMemberByTypeNode(ctx: InterpreterContext, typeNode: NamedTupleMember | TypeNode) {

  const name = isNamedTupleMember(ctx, typeNode)
    ? getNameByTypeNode(ctx, typeNode.name)
    : undefined;

  const type = getTypeByTypeNode(ctx, typeNode);
  const optional = isOptionalTypeNode(ctx, typeNode);
  const rest = isRestTypeNode(ctx, typeNode);
  const kind = EntityKind.TupleMember;

  return <TupleMemberEntity>{
    kind,
    name,
    optional,
    rest,
    type
  };

}
