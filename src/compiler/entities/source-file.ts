import { Symbol } from "typescript";

import { isExportableType } from "../../typeguards/types.js";
import { CompilerContext } from "../../types/context.js";
import { ExportableTypes, Kind, SourceFile } from "../../types/types.js";
import { assert } from "../../utils/general.js";
import { getIdBySymbol } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { parseSymbol } from "../entry-points/symbol.js";
import { getExportedSymbols, lockSymbol } from "../utils/ts.js";


export const createSourceFileBySymbol = (ctx: CompilerContext, symbol: Symbol): SourceFile => lockSymbol(ctx, symbol, () => {

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

});
