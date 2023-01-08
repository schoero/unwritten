import { createFunctionLikeEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";

import type { Symbol } from "typescript";

import type { FunctionEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function createFunctionEntity(ctx: CompilerContext, symbol: Symbol): FunctionEntity {

  const functionLike = createFunctionLikeEntity(ctx, symbol, EntityKind.Function);
  return functionLike;

}
