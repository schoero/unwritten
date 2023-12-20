import {
  isAliasedSymbol,
  isExportSpecifierSymbol,
  isImportClauseSymbol,
  isImportSpecifierSymbol
} from "unwritten:interpreter/typeguards/symbols";
import * as locker from "unwritten:interpreter:utils/locker";
import { assert } from "unwritten:utils:general";

import type { Program, Symbol, Type as TSType } from "typescript";

import type { Entity } from "unwritten:interpreter/type-definitions/entities";
import type { Type } from "unwritten:interpreter/type-definitions/types";
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

// Symbol helpers
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

export function withLockedSymbol<T extends Entity>(ctx: InterpreterContext, symbol: Symbol, callback: (ctx: InterpreterContext, symbol: Symbol) => T): T {
  locker.lockSymbol(ctx, symbol);
  const returnType = callback(ctx, symbol);
  locker.unlockSymbol(ctx, symbol);
  return returnType;
}

export function withLockedType<T extends Type>(ctx: InterpreterContext, type: TSType, callback: (ctx: InterpreterContext, type: TSType) => T): T {
  locker.lockType(ctx, type);
  const returnType = callback(ctx, type);
  locker.unlockType(ctx, type);
  return returnType;
}
