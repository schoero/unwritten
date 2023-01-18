import { createTypeByDeclaration } from "quickdoks:compiler:entry-points/type.js";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { getIdByDeclaration, getIdBySymbol } from "quickdoks:compiler:mixins/id.js";
import {
  getDescriptionByDeclaration,
  getDescriptionBySymbol,
  getJSDocTagsByDeclaration
} from "quickdoks:compiler:mixins/jsdoc.js";
import { getNameByDeclaration, getNameBySymbol } from "quickdoks:compiler:mixins/name.js";
import { getPositionByDeclaration } from "quickdoks:compiler:mixins/position.js";
import { isEnumDeclaration } from "quickdoks:compiler:typeguards/declarations.js";
import { assert } from "quickdoks:utils:general.js";

import type { EnumDeclaration, EnumMember as TSEnumMember, Symbol } from "typescript";

import type {
  EnumEntity,
  EnumMemberEntity,
  MergedEnumEntity
} from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createEnumEntity(ctx: CompilerContext, symbol: Symbol): EnumEntity | MergedEnumEntity {

  const declarations = symbol.getDeclarations()?.filter(isEnumDeclaration);

  assert(declarations && declarations.length > 0, "Enum declarations not found");

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const description = getDescriptionBySymbol(ctx, symbol);
  const fromDeclarations = declarations.map(declaration => parseEnumDeclaration(ctx, declaration));
  const kind = EntityKind.Enum;
  const members = mergeMembers(fromDeclarations);

  if(fromDeclarations.length === 1){
    return <EnumEntity>{
      ...fromDeclarations[0],
      description,
      id,
      kind,
      members,
      name
    };
  } else {
    return <MergedEnumEntity>{
      declarations: fromDeclarations,
      description,
      id,
      kind,
      members,
      name
    };
  }

}


function mergeMembers(enums: ReturnType<typeof parseEnumDeclaration>[]): EnumEntity["members"] {
  return enums.reduce<EnumEntity["members"]>((acc, declaration) => [
    ...acc,
    ...declaration.members
  ], []);
}


function parseEnumDeclaration(ctx: CompilerContext, declaration: EnumDeclaration) {

  const description = getDescriptionByDeclaration(ctx, declaration);
  const jsdocTags = getJSDocTagsByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const members = declaration.members.map(member => createEnumMemberByDeclaration(ctx, member));

  return {
    description,
    members,
    position,
    ...jsdocTags
  };

}


function createEnumMemberByDeclaration(ctx: CompilerContext, declaration: TSEnumMember): EnumMemberEntity {

  const id = getIdByDeclaration(ctx, declaration);
  const name = getNameByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const description = getDescriptionByDeclaration(ctx, declaration);
  const type = createTypeByDeclaration(ctx, declaration);
  const jsdocTags = getJSDocTagsByDeclaration(ctx, declaration);
  const kind = EntityKind.EnumMember;

  assert(name, "Member name not found");

  return {
    description,
    id,
    kind,
    name,
    position,
    type,
    ...jsdocTags
  };

}
