import { Symbol } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Kind, Module } from "../../types/types.js";
import { lockedSymbol } from "../utils/ts.js";
import { createSourceFileBySymbol } from "./source-file.js";


export const createModuleBySymbol = (ctx: CompilerContext, symbol: Symbol): Module => lockedSymbol(ctx, symbol, () => {

  const fromSourceFile = createSourceFileBySymbol(ctx, symbol);
  const kind = Kind.Module;

  return {
    ...fromSourceFile,
    kind
  };

});
