import { Symbol } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Namespace, Kind } from "../../types/types.js";
import { lockedSymbol } from "../utils/ts.js";
import { createSourceFileBySymbol } from "./source-file.js";


export const createNamespaceBySymbol = (ctx: CompilerContext, symbol: Symbol): Namespace => lockedSymbol(ctx, symbol, () => {

  const fromSourceFile = createSourceFileBySymbol(ctx, symbol);
  const kind = Kind.Namespace;

  return {
    ...fromSourceFile,
    kind
  };

});
