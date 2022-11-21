import { Symbol } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Namespace, TypeKind } from "../../types/types.js";
import { lockSymbol } from "../utils/ts.js";
import { createSourceFileBySymbol } from "./source-file.js";


export function createNamespaceBySymbol(ctx: CompilerContext, symbol: Symbol): Namespace {

  lockSymbol(ctx, symbol);

  const fromSourceFile = createSourceFileBySymbol(ctx, symbol);
  const kind = TypeKind.Namespace;

  return {
    ...fromSourceFile,
    kind
  };

}
