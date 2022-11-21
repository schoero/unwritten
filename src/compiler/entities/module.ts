import { Symbol } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Module, TypeKind } from "../../types/types.js";
import { lockSymbol } from "../utils/ts.js";
import { createSourceFileBySymbol } from "./source-file.js";


export function createModuleBySymbol(ctx: CompilerContext, symbol: Symbol): Module {

  lockSymbol(ctx, symbol);

  const fromSourceFile = createSourceFileBySymbol(ctx, symbol);
  const kind = TypeKind.Module;

  return {
    ...fromSourceFile,
    kind
  };

}
