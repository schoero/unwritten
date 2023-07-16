import { type NamedTupleMember, type TupleTypeNode, type TupleTypeReference, type TypeNode } from "typescript";

import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { isOptionalTypeNode, isRestTypeNode, isTupleTypeNode } from "unwritten:interpreter/typeguards/type-nodes.js";
import {
  getDeclaredType,
  getResolvedTypeByTypeNode,
  getTypeByDeclaredOrResolvedType
} from "unwritten:interpreter:ast/index.js";
import { getTypeId } from "unwritten:interpreter:ast/shared/id.js";
import { getNameByTypeNode } from "unwritten:interpreter:ast/shared/name.js";
import { getPositionByNode } from "unwritten:interpreter:ast/shared/position.js";
import { isNamedTupleMember, isTupleTypeReferenceType } from "unwritten:interpreter:typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { TupleMemberEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { TupleType } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createTupleTypeByTypeReference(ctx: InterpreterContext, typeReference: TupleTypeReference): TupleType {

  const typeNode = typeReference.node as TupleTypeNode;

  assert(isTupleTypeNode(typeNode), "Type node is not a tuple type node");

  const members = typeNode.elements.map(element => createTupleTypeMember(ctx, element));
  const position = getPositionByNode(ctx, typeNode);
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


function createTupleTypeMember(ctx: InterpreterContext, typeNode: NamedTupleMember | TypeNode) {

  const resolvedType = getResolvedTypeByTypeNode(ctx, typeNode);
  const declaredType = getDeclaredType(ctx, typeNode);

  const type = getTypeByDeclaredOrResolvedType(declaredType, resolvedType);

  const optional = isOptionalTypeNode(typeNode);
  const rest = isRestTypeNode(typeNode);
  const name = isNamedTupleMember(typeNode) && getNameByTypeNode(ctx, typeNode.name);
  const kind = EntityKind.TupleMember;

  return <TupleMemberEntity>{
    kind,
    name,
    optional,
    rest,
    type
  };

}
