import { createTypeParameterEntityByDeclaration } from "unwritten:interpreter/ast/entities/index";
import { getJSDocProperties } from "unwritten:interpreter/ast/jsdoc";
import { getPositionByDeclaration } from "unwritten:interpreter/ast/shared/position";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { withLockedSymbol } from "unwritten:interpreter/utils/ts";
import { getDeclarationId, getSymbolId } from "unwritten:interpreter:ast/shared/id";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name";
import { isTypeAliasDeclaration } from "unwritten:interpreter:typeguards/declarations";
import { assert } from "unwritten:utils:general";

import { getTypeByTypeNode } from "../type";

import type { Symbol } from "typescript";

import type { TypeAliasEntity } from "unwritten:interpreter/type-definitions/entities";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createTypeAliasEntity = (ctx: InterpreterContext, symbol: Symbol): TypeAliasEntity => withLockedSymbol(ctx, symbol, () => {

  const declaration = symbol.valueDeclaration ?? symbol.getDeclarations()?.[0];

  assert(declaration && isTypeAliasDeclaration(ctx, declaration), "Type alias declaration is not found");

  const name = getNameBySymbol(ctx, symbol);
  const symbolId = getSymbolId(ctx, symbol);

  const jsdocProperties = getJSDocProperties(ctx, declaration);

  const declarationId = getDeclarationId(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);

  // Getting the resolved type via symbol or declaration results in an error type
  const type = getTypeByTypeNode(ctx, declaration.type);
  const kind = EntityKind.TypeAlias;

  const typeParameters = declaration.typeParameters?.map(
    typeParameter => createTypeParameterEntityByDeclaration(ctx, typeParameter)
  );

  return {
    ...jsdocProperties,
    declarationId,
    kind,
    name,
    position,
    symbolId,
    type,
    typeParameters
  };

});
