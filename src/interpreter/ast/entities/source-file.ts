import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { isExportSpecifierSymbol } from "unwritten:interpreter/typeguards/symbols.js";
import { getExportedSymbols, resolveSymbolInCaseOfImport } from "unwritten:interpreter/utils/ts.js";
import { interpretSymbol } from "unwritten:interpreter:ast/index.js";
import { getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { isExportableEntity } from "unwritten:typeguards/entities.js";
import { assert } from "unwritten:utils/general.js";

import type { Symbol } from "typescript";

import type { ExportableEntity, SourceFileEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function createSourceFileEntity(ctx: InterpreterContext, symbol: Symbol): SourceFileEntity {

  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];

  assert(declaration, "Source file symbol has no declaration");

  const exports = getExportedSymbols(ctx, symbol)
    .reduce<ExportableEntity[]>((parsedSymbols, exportedSymbol) => {

    /**
     * Workaround for export specifiers
     * We need to resolve export specifiers to their actual symbols
     * ```ts
     * const test = "test";
     * export {
     *   test // Export specifier
     * }
     * ```
     * But not if it creates a namespaced export
     * ```ts
     * export * as other from "./other"; // Creates a namespaced export `other`
     * ```
     */
    const resolvedSymbol = isExportSpecifierSymbol(exportedSymbol)
      ? resolveSymbolInCaseOfImport(ctx, exportedSymbol)
      : exportedSymbol;

    const parsedSymbol = interpretSymbol(ctx, resolvedSymbol);
    assert(isExportableEntity(parsedSymbol), "Parsed symbol is not an exportable entity");
    parsedSymbols.push(parsedSymbol);

    return parsedSymbols;

  }, []);

  const symbolId = getSymbolId(ctx, symbol);
  const path = declaration.getSourceFile().fileName;
  const name = path.split("/").pop() ?? "";
  const kind = EntityKind.SourceFile;

  return {
    exports,
    kind,
    name,
    path,
    symbolId
  };

}
