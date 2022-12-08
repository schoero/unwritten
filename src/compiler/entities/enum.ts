import { EnumDeclaration, EnumMember as TSEnumMember, Symbol } from "typescript";

import { getIdByDeclaration, getIdBySymbol } from "quickdoks:compiler:compositions/id.js";
import {
  getDescriptionByDeclaration,
  getDescriptionBySymbol,
  getExampleByDeclaration
} from "quickdoks:compiler:compositions/jsdoc.js";
import { getNameByDeclaration, getNameBySymbol } from "quickdoks:compiler:compositions/name.js";
import { getPositionByDeclaration } from "quickdoks:compiler:compositions/position.js";
import { parseSymbol } from "quickdoks:compiler:entry-points/symbol.js";
import { createTypeByDeclaration } from "quickdoks:compiler:entry-points/type.js";
import { isEnumDeclaration, isEnumMemberDeclaration } from "quickdoks:compiler:typeguards/declarations.js";
import { lockSymbol } from "quickdoks:compiler:utils/ts.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Enum, EnumMember, Kind, MergedEnum } from "quickdoks:types:types.js";
import { assert } from "quickdoks:utils:general.js";


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
  const members = declaration.members.map(member => _createEnumMemberByDeclaration(ctx, member));
  const kind = Kind.Enum;

  return {
    description,
    example,
    kind,
    members,
    position
  };

}


function _createEnumMemberByDeclaration(ctx: CompilerContext, declaration: TSEnumMember): EnumMember {

  const id = getIdByDeclaration(ctx, declaration);
  const example = getExampleByDeclaration(ctx, declaration);
  const name = getNameByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const parentSymbol = isEnumMemberDeclaration(declaration) && ctx.checker.getSymbolAtLocation(declaration.parent.name);
  const parent = parentSymbol ? parseSymbol(ctx, parentSymbol) : undefined;
  const description = getDescriptionByDeclaration(ctx, declaration);
  const type = createTypeByDeclaration(ctx, declaration);
  const kind = Kind.EnumMember;

  assert(name, "Member name not found");

  return {
    description,
    example,
    id,
    kind,
    name,
    parent,
    position,
    type
  };

}
