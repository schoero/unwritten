import { getSymbolId, getTypeId } from "unwritten:interpreter/ast/shared/id";
import {
  isAliasedSymbol,
  isExportSpecifierSymbol,
  isImportClauseSymbol,
  isImportSpecifierSymbol
} from "unwritten:interpreter/typeguards/symbols";
import * as locker from "unwritten:interpreter:utils/locker";
import { assert } from "unwritten:utils:general";

import type { Program, Symbol, Type as TSType } from "typescript";

import type { Entity } from "unwritten:interpreter:type-definitions/entities";
import type { Type } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function getEntryFileSymbolsFromProgram(ctx: InterpreterContext, program: Program) {

  const rootFileNames = program.getRootFileNames();
  const entryFiles = rootFileNames.map(rootFileName => program.getSourceFile(rootFileName));

  entryFiles.forEach((entryFile, index) => assert(entryFile, `Entry file ${rootFileNames[index]} not found.`));

  const entryFileSymbols = entryFiles.map(entryFile => ctx.checker.getSymbolAtLocation(entryFile!));

  entryFileSymbols.forEach((entryFileSymbol, index) => assert(entryFileSymbol, `Entry file symbol ${rootFileNames[index]} not found.`));

  return entryFileSymbols as Symbol[];

}


// Locker
export function isSymbolLocked(ctx: InterpreterContext, symbol: Symbol) {
  return locker.isSymbolLocked(ctx, symbol);
}

export function isSymbolUnresolved(ctx: InterpreterContext, symbol: Symbol) {
  return symbol.declarations === undefined || symbol.declarations.length === 0;
}

export function isTypeLocked(ctx: InterpreterContext, type: TSType) {
  return locker.isTypeLocked(ctx, type);
}

export function resolveSymbolInCaseOfImport(ctx: InterpreterContext, symbol: Symbol): Symbol {
  if(!isAliasedSymbol(ctx, symbol)){
    return symbol;
  }

  if(!isExportSpecifierSymbol(ctx, symbol) &&
    !isImportSpecifierSymbol(ctx, symbol) &&
    !isImportClauseSymbol(ctx, symbol)){
    return symbol;
  }

  return ctx.checker.getAliasedSymbol(symbol);
}

export function withCachedEntity<T extends Entity>(ctx: InterpreterContext, symbol: Symbol, interpretSymbol: (ctx: InterpreterContext, symbol: Symbol) => T): T {
  const symbolId = getSymbolId(ctx, symbol);

  if(symbolId in ctx.entityCache){
    return ctx.entityCache[symbolId] as T;
  }

  const entity = interpretSymbol(ctx, symbol);
  ctx.entityCache[symbolId] = entity;

  return entity;
}

export function withCachedType<T extends Type>(ctx: InterpreterContext, type: TSType, interpretType: (ctx: InterpreterContext, type: TSType) => T): T {
  const typeId = getTypeId(ctx, type);

  if(typeId in ctx.typeCache){
    return ctx.typeCache[typeId] as T;
  }

  const interpretedType = interpretType(ctx, type);
  ctx.typeCache[typeId] = interpretedType;

  return interpretedType;
}

export function withLockedSymbol<T extends Entity >(ctx: InterpreterContext, symbol: Symbol, interpretSymbol: (ctx: InterpreterContext, symbol: Symbol) => T): T {
  if(isSymbolLocked(ctx, symbol)){
    return interpretSymbol(ctx, symbol);
  }

  locker.lockSymbol(ctx, symbol);
  const returnType = interpretSymbol(ctx, symbol);
  locker.unlockSymbol(ctx, symbol);
  return returnType;
}

export function withLockedType<T extends Type>(ctx: InterpreterContext, type: TSType, interpretType: (ctx: InterpreterContext, type: TSType) => T): T {
  if(isTypeLocked(ctx, type)){
    return interpretType(ctx, type);
  }

  locker.lockType(ctx, type);
  const returnType = interpretType(ctx, type);
  locker.unlockType(ctx, type);
  return returnType;
}
