import { ElementFlags, Symbol, TupleTypeNode, TupleTypeReference, Type, TypeAliasDeclaration } from "typescript";
import { assert } from "vitest";

import { isTupleTypeNode, isTypeAliasDeclaration } from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";
import { Tuple, TupleMember, TypeKind } from "../../types/types.js";
import { getIdBySymbol, getIdByType, getIdByTypeNode } from "../compositions/id.js";
import { getDescriptionBySymbol } from "../compositions/jsdoc.js";
import { getNameByDeclaration, getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getTargetSymbolByTypeReference } from "./reference.js";
import { createTypeByType } from "./type.js";


export function createTupleTypeByTypeReference(ctx: CompilerContext, typeReference: TupleTypeReference): Tuple {

  const targetSymbol = getTargetSymbolByTypeReference(ctx, typeReference);
  const members = _getMembers(ctx, typeReference, typeReference.typeArguments);
  const fromSymbol = targetSymbol && createTupleBySymbol(ctx, targetSymbol);
  const id = getIdByType(ctx, typeReference);
  const kind = TypeKind.Tuple;

  return {
    id,
    ...fromSymbol,
    kind,
    members
  };

}


export function createTupleBySymbol(ctx: CompilerContext, symbol: Symbol) {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isTypeAliasDeclaration(declaration), "Tuple declaration is not found");

  const fromDeclaration = createTupleByDeclaration(ctx, declaration);

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const description = getDescriptionBySymbol(ctx, symbol);
  const position = getPositionByDeclaration(ctx, declaration);
  const kind = TypeKind.Tuple;

  return {
    ...fromDeclaration,
    description,
    id,
    kind,
    name,
    position
  };

}


export function createTupleByDeclaration(ctx: CompilerContext, declaration: TypeAliasDeclaration) {
  const typeNode = declaration.type;

  assert(isTupleTypeNode(typeNode), "Tuple type node is not found");
  return createTupleByTypeNode(ctx, typeNode);
}


export function createTupleByTypeNode(ctx: CompilerContext, type: TupleTypeNode) {
  const id = getIdByTypeNode(ctx, type);
  const kind = TypeKind.Tuple;
  return {
    id,
    kind
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


// function _createTupleMemberByTypeNode(typeNode: NamedTupleMember | TypeNode): TupleMember {
//   if(isNamedTupleMember(typeNode)){

//     const id = getIdByTypeNode(ctx, typeNode);
//     const name = getNameByTypeNode(typeNode);
//     const optional = typeNode.questionToken !== undefined;
//     const rest = typeNode.dotDotDotToken !== undefined;
//     const type = getTypeByTypeNode(typeNode.type);
//     const kind = EntityKind.Member;

//     return {
//       id,
//       name,
//       optional,
//       rest,
//       type,
//       kind
//     };

//   } else {

//     const id = getIdByTypeNode(ctx, typeNode);
//     const type = getTypeByTypeNode(typeNode);
//     const rest = false;
//     const optional = false;
//     const kind = EntityKind.Member;

//     return {
//       id,
//       type,
//       kind,
//       rest,
//       optional
//     };

//   }

// }
