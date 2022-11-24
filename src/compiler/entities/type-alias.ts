import { Symbol, TypeAliasDeclaration } from "typescript";
import { assert } from "vitest";

import { isTypeAliasDeclaration } from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";
import { TypeAlias, TypeKind } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { getDescriptionBySymbol, getExampleByDeclaration } from "../compositions/jsdoc.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { lockedSymbol } from "../utils/ts.js";
import { createTypeByTypeNode } from "./type.js";
import { createTypeParameterByDeclaration } from "./type-parameter.js";


export const createTypeAliasBySymbol = (ctx: CompilerContext, symbol: Symbol): TypeAlias => lockedSymbol(ctx, symbol, () => {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isTypeAliasDeclaration(declaration), "Type alias declaration is not found");

  const name = getNameBySymbol(ctx, symbol);
  const id = getIdBySymbol(ctx, symbol);
  const description = getDescriptionBySymbol(ctx, symbol);
  const fromDeclaration = _parseTypeAliasDeclaration(ctx, declaration);
  const kind = TypeKind.TypeAlias;

  return {
    ...fromDeclaration,
    description,
    id,
    kind,
    name
  };

});


function _parseTypeAliasDeclaration(ctx: CompilerContext, declaration: TypeAliasDeclaration) {

  const example = getExampleByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const typeParameters = declaration.typeParameters?.map(typeParameter => createTypeParameterByDeclaration(ctx, typeParameter));

  // We have to use typeNode here for type references
  const typeNode = declaration.type;
  const type = createTypeByTypeNode(ctx, typeNode);

  return {
    example,
    position,
    type,
    typeParameters
  };

}
