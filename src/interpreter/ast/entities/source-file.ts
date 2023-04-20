import { parseSymbol } from "unwritten:interpreter:ast/index.js";
import { getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { getNameBySymbol } from "unwritten:interpreter:ast/shared/name.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { getExportedSymbols } from "unwritten:interpreter:utils/ts.js";
import { isExportableEntity } from "unwritten:typeguards/entities.js";
import { assert } from "unwritten:utils:general.js";

import type { Symbol } from "typescript";

import type { ExportableEntities, SourceFileEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function createSourceFileEntity(ctx: InterpreterContext, symbol: Symbol): SourceFileEntity {

  const exports = getExportedSymbols(ctx, symbol)
    .reduce<ExportableEntities[]>((parsedSymbols, exportedSymbol) => {

    const parsedSymbol = parseSymbol(ctx, exportedSymbol);
    assert(isExportableEntity(parsedSymbol), "Parsed symbol is not an exportable type");
    parsedSymbols.push(parsedSymbol);

    return parsedSymbols;

  }, []);

  const symbolId = getSymbolId(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const kind = EntityKind.SourceFile;

  return {
    exports,
    kind,
    name,
    symbolId
  };

}
