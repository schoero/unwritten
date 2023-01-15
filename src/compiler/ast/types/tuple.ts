import ts from "typescript";

import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdByType } from "quickdoks:compiler:mixins/id.js";
import { getNameByDeclaration } from "quickdoks:compiler:mixins/name.js";
import { getPositionByNode } from "quickdoks:compiler:mixins/position.js";
import { isTupleTypeReferenceType } from "quickdoks:compiler:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import type { TupleTypeNode, TupleTypeReference, Type } from "typescript";

import type { TupleMemberEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { TupleType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


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
