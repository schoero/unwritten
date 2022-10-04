import { PropertySignature, Symbol, TypeElement } from "typescript";
import { assert } from "vitest";

import { isPropertySignature } from "../../typeguards/ts.js";
import { Member, TypeKind } from "../../types/types.js";
import { getIdByDeclaration, getIdBySymbol } from "../compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameByDeclaration, getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getTypeByDeclaration, getTypeByTypeNode } from "../compositions/type.js";


export function createMemberBySymbol(memberSymbol: Symbol): Member {

  const declaration = memberSymbol.valueDeclaration ?? memberSymbol.getDeclarations()?.[0];

  assert(declaration && isPropertySignature(declaration), "Property signature not found");

  const id = getIdBySymbol(memberSymbol);
  const name = getNameBySymbol(memberSymbol);
  const fromDeclaration = createMemberByDeclaration(declaration);

  return {
    ...fromDeclaration,
    id,
    name
  };

}


export function createMemberByDeclaration(declaration: PropertySignature | TypeElement): Member {

  const id = getIdByDeclaration(declaration);
  // @ts-expect-error
  const type = declaration.type ? getTypeByTypeNode(declaration.type) : getTypeByDeclaration(declaration);
  const example = getExampleByDeclaration(declaration);
  const name = getNameByDeclaration(declaration);
  const position = getPositionByDeclaration(declaration);
  const description = getDescriptionByDeclaration(declaration);
  const optional = declaration.questionToken !== undefined;
  const kind = TypeKind.Member;

  assert(name, "Member name not found");

  return {
    description,
    example,
    id,
    kind,
    name,
    optional,
    position,
    type
  };

}

