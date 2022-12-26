import { Symbol } from "typescript";

import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, Module } from "quickdoks:types:types.js";

import { createSourceFileBySymbol } from "./source-file.js";


export function createModuleBySymbol(ctx: CompilerContext, symbol: Symbol): Module {

  const fromSourceFile = createSourceFileBySymbol(ctx, symbol);
  const kind = Kind.Module;

  return {
    ...fromSourceFile,
    kind
  };

}
