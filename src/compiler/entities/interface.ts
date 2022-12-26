import { HeritageClause, InterfaceDeclaration, NodeArray, ObjectType, Symbol } from "typescript";

import { getIdBySymbol } from "quickdoks:compiler/compositions/id.js";
import { getNameBySymbol } from "quickdoks:compiler/compositions/name.js";
import { createObjectTypeByType } from "quickdoks:compiler/shared/object-type.js";
import { isInterfaceDeclaration } from "quickdoks:compiler/typeguards/declarations.js";
import { lockType } from "quickdoks:compiler/utils/ts.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "quickdoks:compiler:compositions/jsdoc.js";
import { getPositionByDeclaration } from "quickdoks:compiler:compositions/position.js";
import { parseTypeNode } from "quickdoks:compiler:entry-points/type-node.js";
import { isExpression } from "quickdoks:typeguards/types.js";
import { assert } from "quickdoks:utils:general.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Expression, Interface, Kind } from "quickdoks:type-definitions/types.d.js";

import { createTypeParameterByDeclaration } from "./type-parameter.js";


export function createInterfaceBySymbol(ctx: CompilerContext, symbol: Symbol): Interface {

  const tsType = ctx.checker.getDeclaredTypeOfSymbol(symbol) as ObjectType;
  const fromType = createInterfaceByType(ctx, tsType);

  return {
    ...fromType
  };

}


export const createInterfaceByType = (ctx: CompilerContext, type: ObjectType): Interface => lockType(ctx, type, () => {

  const objectType = createObjectTypeByType(ctx, type, Kind.Interface);

  const symbol = type.getSymbol();
  const fromSymbol = symbol && _parseInterfaceSymbol(ctx, symbol);

  return {
    ...fromSymbol,
    ...objectType
  };

});


function _parseInterfaceSymbol(ctx: CompilerContext, symbol: Symbol) {

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isInterfaceDeclaration(declaration), "InterfaceDeclaration not found");

  const fromDeclaration = _parseInterfaceDeclaration(ctx, declaration);

  return {
    id,
    name,
    ...fromDeclaration
  };

}

function _parseInterfaceDeclaration(ctx: CompilerContext, declaration: InterfaceDeclaration) {

  const heritage = declaration.heritageClauses && _parseHeritageClauses(ctx, declaration.heritageClauses);
  const typeParameters = declaration.typeParameters?.map(typeParameter => createTypeParameterByDeclaration(ctx, typeParameter));
  const position = getPositionByDeclaration(ctx, declaration);
  const example = getExampleByDeclaration(ctx, declaration);
  const description = getDescriptionByDeclaration(ctx, declaration);

  return {
    description,
    example,
    heritage,
    position,
    typeParameters
  };

}


function _parseHeritageClauses(ctx: CompilerContext, heritageClauses: NodeArray<HeritageClause>): Expression[] {
  return heritageClauses
    .flatMap(heritageClause => heritageClause.types.map(typeNode => parseTypeNode(ctx, typeNode)))
    .filter(isExpression);
}
