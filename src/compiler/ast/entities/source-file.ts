import { parseSymbol } from "quickdoks:compiler:entry-points/symbol.js";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { getIdBySymbol } from "quickdoks:compiler:mixins/id.js";
import { getNameBySymbol } from "quickdoks:compiler:mixins/name.js";
import { getExportedSymbols } from "quickdoks:compiler:utils/ts.js";
import { isExportableEntity } from "quickdoks:typeguards/entities.js";
import { assert } from "quickdoks:utils:general.js";

import type { Symbol } from "typescript";

import type { ExportableEntities, SourceFileEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


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
