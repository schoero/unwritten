import { parseTypeNode } from "quickdoks:compiler:entry-points/type-node.js";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { getIdBySymbol } from "quickdoks:compiler:mixins/id.js";
import { getDescriptionBySymbol, getExampleByDeclaration } from "quickdoks:compiler:mixins/jsdoc.js";
import { getNameBySymbol } from "quickdoks:compiler:mixins/name.js";
import { getPositionByDeclaration } from "quickdoks:compiler:mixins/position.js";
import { isTypeAliasDeclaration } from "quickdoks:compiler:typeguards/declarations.js";
import { assert } from "quickdoks:utils:general.js";

import { createTypeParameterEntity } from "./type-parameter.js";

import type { Symbol, TypeAliasDeclaration } from "typescript";

import type { TypeAliasEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


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

  const example = getExampleByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const typeParameters = declaration.typeParameters?.map(typeParameter => createTypeParameterEntity(ctx, typeParameter));

  // We have to use typeNode here for type references, otherwise Array<string> will have type string for example
  const typeNode = declaration.type;
  const type = parseTypeNode(ctx, typeNode);

  return {
    example,
    position,
    type,
    typeParameters
  };

}
