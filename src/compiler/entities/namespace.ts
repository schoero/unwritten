import { Symbol } from "typescript";

import { lockSymbol } from "quickdoks:compiler:utils/ts.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, Namespace } from "quickdoks:types:types.js";

import { createSourceFileBySymbol } from "./source-file.js";


export const createNamespaceBySymbol = (ctx: CompilerContext, symbol: Symbol): Namespace => lockSymbol(ctx, symbol, () => {

  const fromSourceFile = createSourceFileBySymbol(ctx, symbol);
  const kind = Kind.Namespace;

  return {
    ...fromSourceFile,
    kind
  };

});
