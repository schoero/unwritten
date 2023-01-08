import { parseType } from "quickdoks:compiler:entry-points/type.js";

import type { ParameterDeclaration } from "typescript";

import type { Types } from "quickdoks:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "quickdoks:type-definitions/context.d.js";


export function getInitializerByDeclaration(ctx: CompilerContext, declaration: ParameterDeclaration): Types | undefined {
  if(declaration.initializer === undefined){
    return;
  }
  const type = ctx.checker.getTypeAtLocation(declaration.initializer);
  return parseType(ctx, type);
}
