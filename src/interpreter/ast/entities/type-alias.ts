import { parseTypeNode } from "unwritten:interpreter:ast/index.js";
import { getIdBySymbol } from "unwritten:interpreter:ast/shared/id.js";
import { getDescriptionBySymbol, getJSDocTagsByDeclaration } from "unwritten:interpreter:ast/shared/jsdoc.js";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name.js";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { isTypeAliasDeclaration } from "unwritten:interpreter:typeguards/declarations.js";
import { assert } from "unwritten:utils:general.js";

import { createTypeParameterEntity } from "./type-parameter.js";

import type { Symbol, TypeAliasDeclaration } from "typescript";

import type { TypeAliasEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createTypeAliasEntity(ctx: InterpreterContext, symbol: Symbol): TypeAliasEntity {

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


function parseTypeAliasDeclaration(ctx: InterpreterContext, declaration: TypeAliasDeclaration) {

  const typeParameters = declaration.typeParameters?.map(typeParameter => createTypeParameterEntity(ctx, typeParameter));
  const jsdocTags = getJSDocTagsByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const typeNode = declaration.type;
  const type = parseTypeNode(ctx, typeNode);

  return {
    declaredType: type,
    position,
    type,
    typeParameters,
    ...jsdocTags
  };

}
