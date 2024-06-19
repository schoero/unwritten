import { getJSDocProperties } from "unwritten:interpreter/ast/jsdoc";
import { getDeclarationId, getSymbolId } from "unwritten:interpreter/ast/shared/id";
import { getNameByDeclaration, getNameBySymbol } from "unwritten:interpreter/ast/shared/name";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { isNamespaceExport } from "unwritten:interpreter/typeguards/declarations";
import { withCachedEntity, withLockedSymbol } from "unwritten:interpreter/utils/ts";
import { createSourceFileEntity } from "unwritten:interpreter:ast/entities/index";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position";
import { assert } from "unwritten:utils/general";

import type { Symbol } from "typescript";

import type { NamespaceEntity } from "unwritten:interpreter:type-definitions/entities";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export const createNamespaceEntity = (ctx: InterpreterContext, symbol: Symbol): NamespaceEntity => withCachedEntity(ctx, symbol, () => withLockedSymbol(ctx, symbol, () => {

  const fromSourceFile = createSourceFileEntity(ctx, symbol);

  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];

  const name = getNameBySymbol(ctx, symbol);
  const symbolId = getSymbolId(ctx, symbol);
  const jsdocProperties = declaration && getJSDocProperties(ctx, declaration);
  const position = declaration && getPositionByDeclaration(ctx, declaration);
  const declarationId = declaration && getDeclarationId(ctx, declaration);

  const kind = EntityKind.Namespace;

  return {
    ...fromSourceFile,
    ...jsdocProperties,
    declarationId,
    kind,
    name,
    position,
    symbolId
  };

}));

export const createNamespaceEntityFromNamespaceExport = (ctx: InterpreterContext, symbol: Symbol): NamespaceEntity => withLockedSymbol(ctx, symbol, () => {

  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];

  assert(declaration && isNamespaceExport(ctx, declaration), "Declaration is not a namespace export");

  // export * as declaration from "moduleSpecifier";

  assert(declaration.parent.moduleSpecifier, "Module specifier is undefined");

  const exportedSymbol = ctx.checker.getSymbolAtLocation(declaration.parent.moduleSpecifier);

  assert(exportedSymbol, "Exported symbol is undefined");

  const fromSourceFile = createSourceFileEntity(ctx, exportedSymbol);

  const name = getNameByDeclaration(ctx, declaration);

  assert(name, "Namespace exports must have a name");

  const symbolId = getSymbolId(ctx, symbol);
  const jsdocProperties = getJSDocProperties(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const declarationId = getDeclarationId(ctx, declaration);

  const kind = EntityKind.Namespace;

  return {
    ...fromSourceFile,
    ...jsdocProperties,
    declarationId,
    kind,
    name,
    position,
    symbolId
  };

});
