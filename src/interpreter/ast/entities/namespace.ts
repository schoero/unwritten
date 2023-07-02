import ts from "typescript";

import { getDeclarationId, getSymbolId } from "unwritten:interpreter/ast/shared/id.js";
import { getNameByDeclaration } from "unwritten:interpreter/ast/shared/name.js";
import { isNamespaceExport } from "unwritten:interpreter/typeguards/declarations.js";
import { createSourceFileEntity } from "unwritten:interpreter:ast/entities/index.js";
import { getDescriptionByDeclaration, getJSDocTagsByDeclaration } from "unwritten:interpreter:ast/shared/jsdoc.js";
import { getPositionByDeclaration } from "unwritten:interpreter:ast/shared/position.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { getEnumFlagNames } from "unwritten:tests:utils/debug.js";
import { assert } from "unwritten:utils/general.js";

import type { Symbol } from "typescript";

import type { NamespaceEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createNamespaceEntity(ctx: InterpreterContext, symbol: Symbol): NamespaceEntity {

  const fromSourceFile = createSourceFileEntity(ctx, symbol);

  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];

  const symbolId = getSymbolId(ctx, symbol);
  const description = declaration && getDescriptionByDeclaration(ctx, declaration);
  const jsdocTags = declaration && getJSDocTagsByDeclaration(ctx, declaration);
  const position = declaration && getPositionByDeclaration(ctx, declaration);
  const declarationId = declaration && getDeclarationId(ctx, declaration);

  const kind = EntityKind.Namespace;

  return {
    ...fromSourceFile,
    ...jsdocTags,
    declarationId,
    description,
    kind,
    position,
    symbolId
  };

}

export function createNamespaceEntityFromNamespaceExport(ctx: InterpreterContext, symbol: Symbol): NamespaceEntity {

  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];

  const symbolFlags = getEnumFlagNames(ts.SymbolFlags, symbol.flags);

  assert(declaration && isNamespaceExport(declaration), "Declaration is not a namespace export");

  // export * as declaration from "moduleSpecifier";

  assert(declaration.parent.moduleSpecifier, "Module specifier is undefined");

  const exportedSymbol = ctx.checker.getSymbolAtLocation(declaration.parent.moduleSpecifier);

  assert(exportedSymbol, "Exported symbol is undefined");

  const fromSourceFile = createSourceFileEntity(ctx, exportedSymbol);

  const name = getNameByDeclaration(ctx, declaration);

  assert(name, "Namespace exports must have a name");

  const symbolId = getSymbolId(ctx, symbol);
  const description = getDescriptionByDeclaration(ctx, declaration);
  const jsdocTags = getJSDocTagsByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const declarationId = getDeclarationId(ctx, declaration);

  const kind = EntityKind.Namespace;

  return {
    ...fromSourceFile,
    ...jsdocTags,
    declarationId,
    description,
    kind,
    name,
    position,
    symbolId
  };

}
