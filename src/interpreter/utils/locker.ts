import { ensureTypeHasId, getIdByType } from "unwritten:interpreter/ast/shared/id.js";

import type { Type } from "typescript";

import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


function getLocker(ctx: InterpreterContext) {
  ctx.locker ??= new Set<number>();
  return ctx.locker;
}

export function isTypeLocked(ctx: InterpreterContext, type: Type) {
  ensureTypeHasId(ctx, type);
  const locker = getLocker(ctx);
  return locker.has(getIdByType(ctx, type));
}


export function lockType(ctx: InterpreterContext, type: Type) {
  ensureTypeHasId(ctx, type);
  const locker = getLocker(ctx);
  locker.add(getIdByType(ctx, type));
}


export function unlockType(ctx: InterpreterContext, type: Type) {
  ensureTypeHasId(ctx, type);
  const locker = getLocker(ctx);
  locker.delete(getIdByType(ctx, type));
}
