import { Symbol } from "typescript";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Kind, Module } from "quickdoks:type-definitions/types.d.js";

import { createSourceFileBySymbol } from "./source-file.js";


export function createModuleBySymbol(ctx: CompilerContext, symbol: Symbol): Module {

  const fromSourceFile = createSourceFileBySymbol(ctx, symbol);
  const kind = Kind.Module;

  return {
    ...fromSourceFile,
    kind
  };

}
