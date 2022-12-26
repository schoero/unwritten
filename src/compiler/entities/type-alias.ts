import { Symbol, TypeAliasDeclaration } from "typescript";

import { getIdBySymbol } from "quickdoks:compiler:compositions/id.js";
import { getDescriptionBySymbol, getExampleByDeclaration } from "quickdoks:compiler:compositions/jsdoc.js";
import { getNameBySymbol } from "quickdoks:compiler:compositions/name.js";
import { getPositionByDeclaration } from "quickdoks:compiler:compositions/position.js";
import { parseTypeNode } from "quickdoks:compiler:entry-points/type-node.js";
import { isTypeAliasDeclaration } from "quickdoks:compiler:typeguards/declarations.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, TypeAlias } from "quickdoks:types:types.js";
import { assert } from "quickdoks:utils:general.js";

import { createTypeParameterByDeclaration } from "./type-parameter.js";


export function createTypeAliasBySymbol(ctx: CompilerContext, symbol: Symbol): TypeAlias {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isTypeAliasDeclaration(declaration), "Type alias declaration is not found");

  const name = getNameBySymbol(ctx, symbol);
  const id = getIdBySymbol(ctx, symbol);
  const description = getDescriptionBySymbol(ctx, symbol);
  const fromDeclaration = _parseTypeAliasDeclaration(ctx, declaration);
  const kind = Kind.TypeAlias;

  return {
    ...fromDeclaration,
    description,
    id,
    kind,
    name
  };

}


function _parseTypeAliasDeclaration(ctx: CompilerContext, declaration: TypeAliasDeclaration) {

  const example = getExampleByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const typeParameters = declaration.typeParameters?.map(typeParameter => createTypeParameterByDeclaration(ctx, typeParameter));

  // We have to use typeNode here for type references
  const typeNode = declaration.type;
  const type = parseTypeNode(ctx, typeNode);

  return {
    example,
    position,
    type,
    typeParameters
  };

}
