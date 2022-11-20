import { Symbol } from "typescript";

import { isModuleSymbol, isNamespaceSymbol, isSourceFileSymbol } from "../../typeguards/ts.js";
import { CompilerContext } from "../../types/context.js";
import { ensureSymbolHasId, getIdBySymbol } from "../compositions/id.js";
import { getExportedSymbols } from "../utils/ts.js";


export class ExportedSymbols {

  private _map = new Set<number>();

  constructor(ctx: CompilerContext, fileSymbol: Symbol) {
    this._map = this._getExportedSymbolsRecursively(ctx, fileSymbol);
  }


  public isSymbolExported(ctx: CompilerContext, symbol: Symbol) {
    ensureSymbolHasId(ctx, symbol);
    return this._map.has(getIdBySymbol(ctx, symbol));
  }


  private _getExportedSymbolsRecursively(ctx: CompilerContext, symbol: Symbol) {
    return getExportedSymbols(ctx, symbol).reduce<Set<number>>((acc, symbol) => {
      ensureSymbolHasId(ctx, symbol);
      acc.add(getIdBySymbol(ctx, symbol));
      if(isModuleSymbol(symbol) || isNamespaceSymbol(symbol) || isSourceFileSymbol(symbol)){
        this._getExportedSymbolsRecursively(ctx, symbol).forEach(id => acc.add(id));
      }
      return acc;
    }, new Set());
  }

}
