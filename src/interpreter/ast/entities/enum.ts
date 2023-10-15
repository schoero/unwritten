import { getJSDocProperties } from "unwritten:interpreter/ast/jsdoc.js";
import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { getDeclarationId, getSymbolId, getSymbolIdByDeclaration } from "unwritten:interpreter:ast/shared/id.js";
import { getNameByDeclaration, getNameBySymbol } from "unwritten:interpreter:ast/shared/name.js";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position.js";
import { isEnumDeclaration } from "unwritten:interpreter:typeguards/declarations.js";
import { assert } from "unwritten:utils:general.js";

import { getTypeByDeclaration } from "../type";

import type { EnumDeclaration, EnumMember as TSEnumMember, Symbol } from "typescript";

import type {
  EnumEntity,
  EnumMemberEntity,
  MergedEnumEntity
} from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createEnumEntity(ctx: InterpreterContext, symbol: Symbol): EnumEntity | MergedEnumEntity {

  const declarations = symbol.getDeclarations()?.flatMap(declaration => isEnumDeclaration(ctx, declaration) ? declaration : []);

  assert(declarations && declarations.length > 0, "Enum declarations not found");

  const symbolId = getSymbolId(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const fromDeclarations = declarations.map(declaration => parseEnumDeclaration(ctx, declaration));
  const kind = EntityKind.Enum;
  const members = mergeMembers(fromDeclarations);

  if(fromDeclarations.length === 1){
    return <EnumEntity>{
      ...fromDeclarations[0],
      kind,
      members,
      name,
      symbolId
    };
  } else {
    return <MergedEnumEntity>{
      declarations: fromDeclarations,
      kind,
      members,
      name,
      symbolId
    };
  }

}


function mergeMembers(enums: ReturnType<typeof parseEnumDeclaration>[]): EnumEntity["members"] {
  return enums.reduce<EnumEntity["members"]>((acc, declaration) => [
    ...acc,
    ...declaration.members
  ], []);
}


function parseEnumDeclaration(ctx: InterpreterContext, declaration: EnumDeclaration) {

  const jsdocProperties = getJSDocProperties(ctx, declaration);
  const declarationId = getDeclarationId(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const members = declaration.members.map(member => createEnumMemberByDeclaration(ctx, member));

  return {
    ...jsdocProperties,
    declarationId,
    members,
    position
  };

}


function createEnumMemberByDeclaration(ctx: InterpreterContext, declaration: TSEnumMember): EnumMemberEntity {

  const declarationId = getDeclarationId(ctx, declaration);
  const symbolId = getSymbolIdByDeclaration(ctx, declaration);
  const name = getNameByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const type = getTypeByDeclaration(ctx, declaration);
  const jsdocProperties = getJSDocProperties(ctx, declaration);
  const kind = EntityKind.EnumMember;

  assert(name, "Member name not found");

  return {
    ...jsdocProperties,
    declarationId,
    kind,
    name,
    position,
    symbolId,
    type
  };

}
