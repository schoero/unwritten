import { createFunctionLikeEntity } from "unwritten:compiler:entities";
import { EntityKind } from "unwritten:compiler:enums/entities.js";

import type { Symbol } from "typescript";

import type { FunctionEntity } from "unwritten:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function createFunctionEntity(ctx: CompilerContext, symbol: Symbol): FunctionEntity {
  const functionLike = createFunctionLikeEntity(ctx, symbol, EntityKind.Function);
  return functionLike;
}
