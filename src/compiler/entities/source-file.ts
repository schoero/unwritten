import { Symbol } from "typescript";

import { getIdBySymbol } from "quickdoks:compiler:compositions/id.js";
import { getNameBySymbol } from "quickdoks:compiler:compositions/name.js";
import { parseSymbol } from "quickdoks:compiler:entry-points/symbol.js";
import { getExportedSymbols } from "quickdoks:compiler:utils/ts.js";
import { isExportableType } from "quickdoks:typeguards/types.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { ExportableTypes, Kind, SourceFile } from "quickdoks:types:types.js";
import { assert } from "quickdoks:utils:general.js";


export function createSourceFileBySymbol(ctx: CompilerContext, symbol: Symbol): SourceFile {

  const exports = getExportedSymbols(ctx, symbol)
    .reduce<ExportableTypes[]>((parsedSymbols, exportedSymbol) => {

    const parsedSymbol = parseSymbol(ctx, exportedSymbol);
    assert(isExportableType(parsedSymbol), "Parsed symbol is not an exportable type");
    parsedSymbols.push(parsedSymbol);

    return parsedSymbols;

  }, []);

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const kind = Kind.SourceFile;

  return {
    exports,
    id,
    kind,
    name
  };

}
