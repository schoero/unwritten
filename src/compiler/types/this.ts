import { Type } from "typescript";
import { assert } from "vitest";

import { EntityKind, This } from "../../types/types.js";
import { createTargetBySymbol } from "./reference.js";


export function createThisByType(type: Type): This {

  const symbol = type.getSymbol() ?? type.aliasSymbol;

  assert(symbol, "Symbol is not found");

  const target = createTargetBySymbol(symbol);
  const kind = EntityKind.This;

  return {
    ...target,
    kind
  };

}