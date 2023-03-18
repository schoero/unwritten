import { ensureTypeHasId, getIdByType } from "unwritten:interpreter/ast/shared/id.js";

import type { Type } from "typescript";

import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


function getLocker(ctx: CompilerContext) {
  ctx.locker ??= new Set<number>();
  return ctx.locker;
}

export function isTypeLocked(ctx: CompilerContext, type: Type) {
  ensureTypeHasId(ctx, type);
  const locker = getLocker(ctx);
  return locker.has(getIdByType(ctx, type));
}


export function lockType(ctx: CompilerContext, type: Type) {
  ensureTypeHasId(ctx, type);
  const locker = getLocker(ctx);
  locker.add(getIdByType(ctx, type));
}


export function unlockType(ctx: CompilerContext, type: Type) {
  ensureTypeHasId(ctx, type);
  const locker = getLocker(ctx);
  locker.delete(getIdByType(ctx, type));
}
