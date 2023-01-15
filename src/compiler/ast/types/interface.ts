import { createObjectLikeType } from "quickdoks:compiler/ast/types/object.js";
import { createTypeParameterEntity } from "quickdoks:compiler:entities";
import { parseTypeNode } from "quickdoks:compiler:entry-points/type-node.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { getIdBySymbol } from "quickdoks:compiler:mixins/id.js";
import { getDescriptionByDeclaration, getExampleByDeclaration } from "quickdoks:compiler:mixins/jsdoc.js";
import { getNameBySymbol } from "quickdoks:compiler:mixins/name.js";
import { getPositionByDeclaration } from "quickdoks:compiler:mixins/position.js";
import { isInterfaceDeclaration } from "quickdoks:compiler:typeguards/declarations.js";
import { lockType } from "quickdoks:compiler:utils/ts.js";
import { isExpressionEntity } from "quickdoks:typeguards/entities.js";
import { assert } from "quickdoks:utils:general.js";

import type { HeritageClause, InterfaceDeclaration, NodeArray, ObjectType, Symbol } from "typescript";

import type { ExpressionEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { InterfaceType } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export const createInterfaceByType = (ctx: CompilerContext, type: ObjectType): InterfaceType => lockType(ctx, type, () => {

  const objectType = createObjectLikeType(ctx, type, TypeKind.InterfaceType);

  const symbol = type.getSymbol();
  const fromSymbol = symbol && parseInterfaceSymbol(ctx, symbol);

  return {
    ...fromSymbol,
    ...objectType
  };

});


function parseInterfaceSymbol(ctx: CompilerContext, symbol: Symbol) {

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isInterfaceDeclaration(declaration), "InterfaceDeclaration not found");

  const fromDeclaration = parseInterfaceDeclaration(ctx, declaration);

  return {
    id,
    name,
    ...fromDeclaration
  };

}

function parseInterfaceDeclaration(ctx: CompilerContext, declaration: InterfaceDeclaration) {

  const heritage = declaration.heritageClauses && parseHeritageClauses(ctx, declaration.heritageClauses);
  const typeParameters = declaration.typeParameters?.map(typeParameter => createTypeParameterEntity(ctx, typeParameter));
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


function parseHeritageClauses(ctx: CompilerContext, heritageClauses: NodeArray<HeritageClause>): ExpressionEntity[] {
  return heritageClauses
    .flatMap(heritageClause => heritageClause.types.map(typeNode => parseTypeNode(ctx, typeNode)))
    .filter(isExpressionEntity);
}
