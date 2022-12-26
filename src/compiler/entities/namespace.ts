import { Symbol } from "typescript";

import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, Namespace } from "quickdoks:types:types.js";

import { createSourceFileBySymbol } from "./source-file.js";


export function createNamespaceBySymbol(ctx: CompilerContext, symbol: Symbol): Namespace {

  const fromSourceFile = createSourceFileBySymbol(ctx, symbol);
  const kind = Kind.Namespace;

  return {
    ...fromSourceFile,
    kind
  };

}
