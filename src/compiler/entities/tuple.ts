import { ElementFlags, TupleTypeReference, Type } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Tuple, TupleMember, TypeKind } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";
import { getNameByDeclaration } from "../compositions/name.js";
import { getPositionByNode } from "../compositions/position.js";
import { createTypeByType } from "./type.js";


export function createTupleTypeByTypeReference(ctx: CompilerContext, typeReference: TupleTypeReference): Tuple {

  const node = typeReference.node;
  const members = _getMembers(ctx, typeReference, typeReference.typeArguments);
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


function _getMembers(ctx: CompilerContext, tupleTypeReference: TupleTypeReference, typeArguments?: readonly Type[]) {

  const members = typeArguments?.map((typeArgument, index) => {

    const type = createTypeByType(ctx, typeArgument);

    const id = getIdByType(ctx, typeArgument);
    const elementFlag = tupleTypeReference.target.elementFlags[index];
    const optional = (elementFlag && elementFlag & ElementFlags.Optional) !== 0;
    const rest = (elementFlag && elementFlag & ElementFlags.Rest) !== 0;
    const labelDeclaration = tupleTypeReference.target.labeledElementDeclarations?.[index];
    const name = labelDeclaration && getNameByDeclaration(ctx, labelDeclaration);
    const kind = TypeKind.Member;

    return <TupleMember>{
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
