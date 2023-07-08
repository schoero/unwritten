import { ensureTypeHasId, getTypeId } from "unwritten:interpreter:ast/shared/id.js";

import type { Type } from "typescript";

import type { InterpreterContext } from "unwritten:type-definitions/context.js";


function getLocker(ctx: InterpreterContext) {
  ctx.locker ??= new Set<number>();
  return ctx.locker;
}

export function isTypeLocked(ctx: InterpreterContext, type: Type) {
  ensureTypeHasId(ctx, type);
  const locker = getLocker(ctx);
  return locker.has(getTypeId(ctx, type));
}


export function lockType(ctx: InterpreterContext, type: Type) {
  ensureTypeHasId(ctx, type);
  const locker = getLocker(ctx);
  locker.add(getTypeId(ctx, type));
}


export function unlockType(ctx: InterpreterContext, type: Type) {
  ensureTypeHasId(ctx, type);
  const locker = getLocker(ctx);
  locker.delete(getTypeId(ctx, type));
}
