import { Symbol } from "typescript";

import { lockSymbol } from "quickdoks:compiler:utils/ts.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, Module } from "quickdoks:types:types.js";

import { createSourceFileBySymbol } from "./source-file.js";


export const createModuleBySymbol = (ctx: CompilerContext, symbol: Symbol): Module => lockSymbol(ctx, symbol, () => {

  const fromSourceFile = createSourceFileBySymbol(ctx, symbol);
  const kind = Kind.Module;

  return {
    ...fromSourceFile,
    kind
  };

});
