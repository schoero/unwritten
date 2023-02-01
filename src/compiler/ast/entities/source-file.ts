import { parseSymbol } from "unwritten:compiler:entry-points/symbol.js";
import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { getIdBySymbol } from "unwritten:compiler:shared/id.js";
import { getNameBySymbol } from "unwritten:compiler:shared/name.js";
import { getExportedSymbols } from "unwritten:compiler:utils/ts.js";
import { isExportableEntity } from "unwritten:typeguards/entities.js";
import { assert } from "unwritten:utils:general.js";

import type { Symbol } from "typescript";

import type { ExportableEntities, SourceFileEntity } from "unwritten:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createSourceFileEntity(ctx: CompilerContext, symbol: Symbol): SourceFileEntity {

  const exports = getExportedSymbols(ctx, symbol)
    .reduce<ExportableEntities[]>((parsedSymbols, exportedSymbol) => {

    const parsedSymbol = parseSymbol(ctx, exportedSymbol);
    assert(isExportableEntity(parsedSymbol), "Parsed symbol is not an exportable type");
    parsedSymbols.push(parsedSymbol);

    return parsedSymbols;

  }, []);

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const kind = EntityKind.SourceFile;

  return {
    exports,
    id,
    kind,
    name
  };

}
