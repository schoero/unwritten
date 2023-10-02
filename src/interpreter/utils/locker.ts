import { getSymbolId, getTypeId } from "unwritten:interpreter:ast/shared/id.js";

import type { Symbol, Type } from "typescript";

import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function isSymbolLocked(ctx: InterpreterContext, symbol: Symbol) {
  const locker = getLocker(ctx);
  return locker.has(getSymbolId(ctx, symbol));
}

function getLocker(ctx: InterpreterContext) {
  ctx.locker ??= new Set<number>();
  return ctx.locker;
}

export function isTypeLocked(ctx: InterpreterContext, type: Type) {
  const locker = getLocker(ctx);
  return locker.has(getTypeId(ctx, type));
}

export function lockSymbol(ctx: InterpreterContext, symbol: Symbol) {
  const locker = getLocker(ctx);
  locker.add(getSymbolId(ctx, symbol));
}

export function lockType(ctx: InterpreterContext, type: Type) {
  const locker = getLocker(ctx);
  locker.add(getTypeId(ctx, type));
}

export function unlockSymbol(ctx: InterpreterContext, symbol: Symbol) {
  const locker = getLocker(ctx);
  locker.delete(getSymbolId(ctx, symbol));
}

export function unlockType(ctx: InterpreterContext, type: Type) {
  const locker = getLocker(ctx);
  locker.delete(getTypeId(ctx, type));
}
