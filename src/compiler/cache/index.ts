
import ts from "typescript";

import { resolveSymbolInCaseOfImport } from "../../utils/ts.js";
import { ensureSymbolHasId } from "../compositions/id.js";


type SymbolCache = number[];

const _symbolCaches: SymbolCache[] = [[]];

export function getSymbolCache() {
  return _symbolCaches[_symbolCaches.length - 1]!;
}

export function cacheSymbol(symbol: ts.Symbol) {

  ensureSymbolHasId(symbol);

  // @ts-expect-error
  getSymbolCache().push(symbol.id);

  const resolvedSymbol = resolveSymbolInCaseOfImport(symbol);

  ensureSymbolHasId(resolvedSymbol);

  // @ts-expect-error
  if(resolvedSymbol.id !== symbol.id){
  // @ts-expect-error
    getSymbolCache().push(resolvedSymbol.id);
  }

  return symbol;

}


export function removeCachedSymbol(symbol: ts.Symbol) {

  ensureSymbolHasId(symbol);

  const symbolCache = getSymbolCache();

  // @ts-expect-error
  const index = symbolCache.indexOf(symbol.id);

  if(index !== -1){
    symbolCache.splice(index, 1);
  }

}

export function cacheSymbolTemporarily<R>(symbol: ts.Symbol, callback: (symbol: ts.Symbol) => R) {
  cacheSymbol(symbol);

  const returnValue = callback(symbol);

  removeCachedSymbol(symbol);
  return returnValue;
}


export function isSymbolCached(symbol: ts.Symbol): boolean {

  ensureSymbolHasId(symbol);

  // @ts-expect-error
  return getSymbolCache().includes(symbol.id);

}


export function createSymbolCache<R>(callback: (cache: SymbolCache) => R) {
  _symbolCaches.push([]);

  const returnValue = callback(getSymbolCache());

  closeSymbolCache();
  return returnValue;
}

function closeSymbolCache() {
  if(_symbolCaches.length > 1){
    _symbolCaches.pop();
  }
}
