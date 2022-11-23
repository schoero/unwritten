import { HeritageClause, InterfaceDeclaration, Symbol, Type } from "typescript";
import { assert } from "vitest";

import { isInterfaceDeclaration } from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";
import { Interface, MergedInterface, TypeKind } from "../../types/types.js";
import { getIdByDeclaration, getIdBySymbol } from "../compositions/id.js";
import { getDescriptionBySymbol, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { lockedSymbol } from "../utils/ts.js";
import { createMemberByDeclaration } from "./member.js";
import { createTypeParameterByDeclaration } from "./type-parameter.js";


export const createInterfaceBySymbol = (ctx: CompilerContext, symbol: Symbol): Interface | MergedInterface => lockedSymbol(ctx, symbol, () => {

  const declarations = symbol.getDeclarations()?.filter(isInterfaceDeclaration);

  assert(declarations && declarations.length > 0, "Interface declarations not found");

  const name = getNameBySymbol(ctx, symbol);
  const id = getIdBySymbol(ctx, symbol);
  const description = getDescriptionBySymbol(ctx, symbol);
  const fromDeclarations = declarations.map(declaration => _parseInterfaceDeclaration(ctx, declaration));
  const kind = TypeKind.Interface;
  const members = _mergeMembers(fromDeclarations);

  if(fromDeclarations.length === 1){
    return <Interface>{
      ...fromDeclarations[0],
      description,
      id,
      kind,
      members,
      name
    };
  } else {
    return <MergedInterface>{
      declarations: fromDeclarations,
      description,
      id,
      kind,
      members,
      name
    };
  }

});


export function createInterfaceByType(ctx: CompilerContext, type: Type): Interface {
  return createInterfaceBySymbol(ctx, type.symbol);
}


function _mergeMembers(interfaces: ReturnType<typeof _parseInterfaceDeclaration>[]): Interface["members"] {
  return interfaces.reduce<Interface["members"]>((acc, declaration) => [
    ...acc,
    ...declaration.heritage?.members ?? [],
    ...declaration.members
  ], []);
}


function _parseInterfaceDeclaration(ctx: CompilerContext, declaration: InterfaceDeclaration) {

  const members = declaration.members.map(declaration => createMemberByDeclaration(ctx, declaration));
  const heritage = declaration.heritageClauses?.map(heritageClause => _createInterfaceByHeritageClause(ctx, heritageClause))[0];
  const example = getExampleByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const typeParameters = declaration.typeParameters?.map(typeParameter => createTypeParameterByDeclaration(ctx, typeParameter));
  const id = getIdByDeclaration(ctx, declaration);
  const kind = TypeKind.Interface;

  return {
    example,
    heritage,
    id,
    kind,
    members,
    position,
    typeParameters
  };

}


function _createInterfaceByHeritageClause(ctx: CompilerContext, heritageClause: HeritageClause): Interface {
  const typeNode = heritageClause.types[0]!;
  const type = ctx.checker.getTypeFromTypeNode(typeNode);
  return createInterfaceByType(ctx, type);
}
