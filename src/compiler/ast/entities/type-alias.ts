import { getIdBySymbol } from "unwritten:compiler/ast/shared/id.js";
import { getDescriptionBySymbol, getJSDocTagsByDeclaration } from "unwritten:compiler/ast/shared/jsdoc.js";
import { getNameBySymbol } from "unwritten:compiler/ast/shared/name.js";
import { getPositionByDeclaration } from "unwritten:compiler/ast/shared/position.js";
import { parseTypeNode } from "unwritten:compiler:ast/index.js";
import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { isTypeAliasDeclaration } from "unwritten:compiler:typeguards/declarations.js";
import { assert } from "unwritten:utils:general.js";

import { createTypeParameterEntity } from "./type-parameter.js";

import type { Symbol, TypeAliasDeclaration } from "typescript";

import type { TypeAliasEntity } from "unwritten:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createTypeAliasEntity(ctx: CompilerContext, symbol: Symbol): TypeAliasEntity {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isTypeAliasDeclaration(declaration), "Type alias declaration is not found");

  const name = getNameBySymbol(ctx, symbol);
  const id = getIdBySymbol(ctx, symbol);
  const description = getDescriptionBySymbol(ctx, symbol);
  const fromDeclaration = parseTypeAliasDeclaration(ctx, declaration);
  const kind = EntityKind.TypeAlias;

  return {
    ...fromDeclaration,
    description,
    id,
    kind,
    name
  };

}


function parseTypeAliasDeclaration(ctx: CompilerContext, declaration: TypeAliasDeclaration) {

  const typeParameters = declaration.typeParameters?.map(typeParameter => createTypeParameterEntity(ctx, typeParameter));
  const jsdocTags = getJSDocTagsByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const typeNode = declaration.type;
  const type = parseTypeNode(ctx, typeNode);

  return {
    position,
    type,
    typeParameters,
    ...jsdocTags
  };

}
