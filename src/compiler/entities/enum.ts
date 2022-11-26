import { EnumDeclaration, Symbol } from "typescript";
import { assert } from "vitest";

import { CompilerContext } from "../../types/context.js";
import { Enum, Kind, MergedEnum } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import {
  getDescriptionByDeclaration,
  getDescriptionBySymbol,
  getExampleByDeclaration
} from "../compositions/jsdoc.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { isEnumDeclaration } from "../typeguards/declarations.js";
import { lockSymbol } from "../utils/ts.js";
import { createMemberByDeclaration } from "./member.js";


export const createEnumBySymbol = (ctx: CompilerContext, symbol: Symbol): Enum | MergedEnum => lockSymbol(ctx, symbol, () => {

  const declarations = symbol.getDeclarations()?.filter(isEnumDeclaration);

  assert(declarations && declarations.length > 0, "Enum declarations not found");

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const description = getDescriptionBySymbol(ctx, symbol);
  const fromDeclarations = declarations.map(declaration => _parseEnumDeclaration(ctx, declaration));
  const kind = Kind.Enum;
  const members = _mergeMembers(fromDeclarations);

  if(fromDeclarations.length === 1){
    return <Enum>{
      ...fromDeclarations[0],
      description,
      id,
      kind,
      members,
      name
    };
  } else {
    return <MergedEnum>{
      declarations: fromDeclarations,
      description,
      id,
      kind,
      members,
      name
    };
  }

});


function _mergeMembers(enums: ReturnType<typeof _parseEnumDeclaration>[]): Enum["members"] {
  return enums.reduce<Enum["members"]>((acc, declaration) => [
    ...acc,
    ...declaration.members
  ], []);
}


function _parseEnumDeclaration(ctx: CompilerContext, declaration: EnumDeclaration) {

  const description = getDescriptionByDeclaration(ctx, declaration);
  const example = getExampleByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const members = declaration.members.map(member => createMemberByDeclaration(ctx, member));
  const kind = Kind.Enum;

  return {
    description,
    example,
    kind,
    members,
    position
  } as const;

}
