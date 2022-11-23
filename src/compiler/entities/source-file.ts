import { Symbol } from "typescript";
import { assert } from "vitest";

import { parseSymbol } from "../../parser/index.js";
import { isExportableType } from "../../typeguards/types.js";
import { CompilerContext } from "../../types/context.js";
import { ExportableTypes, SourceFile, TypeKind } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";
import { getExportedSymbols, lockedSymbol } from "../utils/ts.js";


export const createSourceFileBySymbol = (ctx: CompilerContext, symbol: Symbol): SourceFile => lockedSymbol(ctx, symbol, () => {

  const exports = getExportedSymbols(ctx, symbol)
    .reduce<ExportableTypes[]>((parsedSymbols, exportedSymbol) => {

    const parsedSymbol = parseSymbol(ctx, exportedSymbol);
    assert(isExportableType(parsedSymbol), "Parsed symbol is not an exportable type");
    parsedSymbols.push(parsedSymbol);

    return parsedSymbols;

  }, []);

  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const kind = TypeKind.SourceFile;

  return {
    exports,
    id,
    kind,
    name
  };

});
