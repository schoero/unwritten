import { getSymbolId, getTypeId } from "unwritten:interpreter:ast/shared/id";

import type { Symbol, Type } from "typescript";
import type { InterpreterContext } from "unwritten:type-definitions/context";


function getSymbolLocker(ctx: InterpreterContext) {
  ctx.symbolLocker ??= new Set<number>();
  return ctx.symbolLocker;
}

function getTypeLocker(ctx: InterpreterContext) {
  ctx.typeLocker ??= new Set<number>();
  return ctx.typeLocker;
}

export function isSymbolLocked(ctx: InterpreterContext, symbol: Symbol) {
  const symbolLocker = getSymbolLocker(ctx);
  return symbolLocker.has(getSymbolId(ctx, symbol));
}


export function isTypeLocked(ctx: InterpreterContext, type: Type) {
  const typeLocker = getTypeLocker(ctx);
  return typeLocker.has(getTypeId(ctx, type));
}

export function lockSymbol(ctx: InterpreterContext, symbol: Symbol) {
  const symbolLocker = getSymbolLocker(ctx);
  symbolLocker.add(getSymbolId(ctx, symbol));
}

export function lockType(ctx: InterpreterContext, type: Type) {
  const typeLocker = getTypeLocker(ctx);
  typeLocker.add(getTypeId(ctx, type));
}

export function unlockSymbol(ctx: InterpreterContext, symbol: Symbol) {
  const symbolLocker = getSymbolLocker(ctx);
  symbolLocker.delete(getSymbolId(ctx, symbol));
}

export function unlockType(ctx: InterpreterContext, type: Type) {
  const typeLocker = getTypeLocker(ctx);
  typeLocker.delete(getTypeId(ctx, type));
}
