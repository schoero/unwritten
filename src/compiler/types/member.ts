import { Declaration, Symbol } from "typescript";

import { assert } from "vitest";

import { isPropertySignature } from "../../typeguards/ts.js";
import { EntityKind, FromDeclaration, FromSymbol, Member } from "../../types/types.js";
import { getIdByDeclaration, getIdBySymbol } from "../compositions/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getTypeByDeclaration } from "../compositions/type.js";




export function createMemberBySymbol(memberSymbol: Symbol): FromSymbol<FromDeclaration<Member>> {

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


export function createMemberByDeclaration(declaration: Declaration): FromDeclaration<Member> {

  const id = getIdByDeclaration(declaration);
  const type = getTypeByDeclaration(declaration);
  const example = getExampleByDeclaration(declaration);
  const position = getPositionByDeclaration(declaration);
  const description = getDescriptionByDeclaration(declaration);
  const kind = EntityKind.Member;

  return {
    id,
    example,
    position,
    description,
    kind,
    type
  };

}

