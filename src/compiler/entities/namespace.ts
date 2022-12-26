import { Symbol } from "typescript";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Kind, Namespace } from "quickdoks:type-definitions/types.d.js";

import { createSourceFileBySymbol } from "./source-file.js";


export function createNamespaceBySymbol(ctx: CompilerContext, symbol: Symbol): Namespace {

  const fromSourceFile = createSourceFileBySymbol(ctx, symbol);
  const kind = Kind.Namespace;

  return {
    ...fromSourceFile,
    kind
  };

}
