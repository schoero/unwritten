import { ElementFlags, Symbol, TupleTypeNode, TupleTypeReference, Type, TypeAliasDeclaration } from "typescript";

import { assert } from "vitest";

import { isTupleTypeNode, isTypeAliasDeclaration } from "../../typeguards/ts.js";
import { EntityKind, Tuple, TupleMember } from "../../types/types.js";
import { getIdBySymbol, getIdByType, getIdByTypeNode } from "../compositions/id.js";
import { getDescriptionBySymbol } from "../compositions/jsdoc.js";
import { getNameByDeclaration, getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getTypeByType } from "../compositions/type.js";
import { getTargetSymbolByTypeReference } from "./reference.js";


export function createTupleTypeByTypeReference(typeReference: TupleTypeReference): Tuple {
  const targetSymbol = getTargetSymbolByTypeReference(typeReference);
  const members = _getMembers(typeReference, typeReference.typeArguments);
  const fromSymbol = createTupleBySymbol(targetSymbol);
  const kind = EntityKind.Tuple;
  return {
    ...fromSymbol,
    kind,
    members
  };
}


export function createTupleBySymbol(symbol: Symbol) {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isTypeAliasDeclaration(declaration), "Tuple declaration is not found");

  const id = getIdBySymbol(symbol);
  const name = getNameBySymbol(symbol);
  const fromDeclaration = createTupleByDeclaration(declaration);
  const description = getDescriptionBySymbol(symbol);
  const position = getPositionByDeclaration(declaration);
  const kind = EntityKind.Tuple;

  return {
    ...fromDeclaration,
    id,
    kind,
    description,
    name,
    position
  };

}


export function createTupleByDeclaration(declaration: TypeAliasDeclaration) {
  const typeNode = declaration.type;

  assert(isTupleTypeNode(typeNode), "Tuple type node is not found");
  return createTupleByTypeNode(typeNode);
}


export function createTupleByTypeNode(type: TupleTypeNode) {
  const id = getIdByTypeNode(type);
  const kind = EntityKind.Tuple;
  return {
    id,
    kind
  };
}


function _getMembers(tupleTypeReference: TupleTypeReference, typeArguments?: readonly Type[]) {

  const members = typeArguments?.map((typeArgument, index) => {

    const type = getTypeByType(typeArgument);

    const id = getIdByType(typeArgument);
    const elementFlag = tupleTypeReference.target.elementFlags[index];
    const optional = (elementFlag && elementFlag & ElementFlags.Optional) !== 0;
    const rest = (elementFlag && elementFlag & ElementFlags.Rest) !== 0;
    const labelDeclaration = tupleTypeReference.target.labeledElementDeclarations?.[index];
    const name = labelDeclaration && getNameByDeclaration(labelDeclaration);
    const kind = EntityKind.Member;

    return <TupleMember>{
      id,
      type,
      optional,
      rest,
      name,
      kind
    };

  });

  return members ?? [] ;

}


// function _createTupleMemberByTypeNode(typeNode: NamedTupleMember | TypeNode): TupleMember {
//   if(isNamedTupleMember(typeNode)){

//     const id = getIdByTypeNode(typeNode);
//     const name = getNameByTypeNode(typeNode);
//     const optional = typeNode.questionToken !== undefined;
//     const rest = typeNode.dotDotDotToken !== undefined;
//     const type = getTypeByTypeNode(typeNode.type);
//     const kind = EntityKind.Member;

//     return {
//       id,
//       name: name,
//       optional,
//       rest,
//       type,
//       kind
//     };

//   } else {

//     const id = getIdByTypeNode(typeNode);
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