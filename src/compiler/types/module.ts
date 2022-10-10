import { Symbol } from "typescript";

import { parse } from "../../parser/index.js";
import { CompilerContext } from "../../types/context.js";
import { Module, TypeKind } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { getNameBySymbol } from "../compositions/name.js";


export function createModuleBySymbol(ctx: CompilerContext, symbol: Symbol): Module {

  const exports = parse(ctx, symbol);
  const id = getIdBySymbol(ctx, symbol);
  const name = getNameBySymbol(ctx, symbol);
  const kind = TypeKind.Module;

  return {
    exports,
    id,
    kind,
    name
  };

}
