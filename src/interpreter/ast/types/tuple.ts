import ts from "typescript";

import { getIdByType } from "unwritten:interpreter/ast/shared/id.js";
import { getNameByDeclaration } from "unwritten:interpreter/ast/shared/name.js";
import { getPositionByNode } from "unwritten:interpreter/ast/shared/position.js";
import { parseType } from "unwritten:interpreter/ast/index.js";
import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { isTupleTypeReferenceType } from "unwritten:interpreter/typeguards/types.js";
import { assert } from "unwritten:utils:general.js";

import type { TupleTypeNode, TupleTypeReference, Type } from "typescript";

import type { TupleMemberEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { TupleType } from "unwritten:interpreter/type-definitions/types.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createTupleTypeByTypeReference(ctx: CompilerContext, typeReference: TupleTypeReference): TupleType {

  const node = typeReference.node;
  const members = getMembers(ctx, typeReference, typeReference.typeArguments);
  const position = node && getPositionByNode(ctx, node);
  const id = getIdByType(ctx, typeReference);
  const kind = TypeKind.Tuple;

  return {
    id,
    kind,
    members,
    position
  };

}


export function createTupleByTupleTypeNode(ctx: CompilerContext, tupleTypeNode: TupleTypeNode): TupleType {
  const type = ctx.checker.getTypeFromTypeNode(tupleTypeNode);
  assert(isTupleTypeReferenceType(type), "Type is not a type reference");
  return createTupleTypeByTypeReference(ctx, type);
}


function getMembers(ctx: CompilerContext, tupleTypeReference: TupleTypeReference, typeArguments?: readonly Type[]) {

  const members = typeArguments?.map((typeArgument, index) => {

    const type = parseType(ctx, typeArgument);

    const id = getIdByType(ctx, typeArgument);
    const elementFlag = tupleTypeReference.target.elementFlags[index];
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const optional = (elementFlag && elementFlag & ts.ElementFlags.Optional) !== 0;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const rest = (elementFlag && elementFlag & ts.ElementFlags.Rest) !== 0;
    const labelDeclaration = tupleTypeReference.target.labeledElementDeclarations?.[index];
    const name = labelDeclaration && getNameByDeclaration(ctx, labelDeclaration);
    const kind = EntityKind.TupleMember;

    return <TupleMemberEntity>{
      id,
      kind,
      name,
      optional,
      rest,
      type
    };

  });

  return members ?? [];

}
