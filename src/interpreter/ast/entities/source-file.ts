import { EntityKind } from "unwritten:interpreter/enums/entity.js";
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

  const exports = ctx.checker.getExportsOfModule(symbol)
    .reduce<ExportableEntity[]>((parsedSymbols, exportedSymbol) => {

    const parsedSymbol = interpretSymbol(ctx, exportedSymbol);

    // Don't document unresolved entities
    if(isExportableEntity(parsedSymbol)){
      parsedSymbols.push(parsedSymbol);
    }

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
