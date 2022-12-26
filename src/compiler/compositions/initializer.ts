import { ParameterDeclaration } from "typescript";

import { parseType } from "quickdoks:compiler:entry-points/type.js";

import { CompilerContext } from "quickdoks:type-definitions/context.d.js";
import { Types } from "quickdoks:type-definitions/types.d.js";


export function getInitializerByDeclaration(ctx: CompilerContext, declaration: ParameterDeclaration): Types | undefined {
  if(declaration.initializer === undefined){
    return;
  }
  const type = ctx.checker.getTypeAtLocation(declaration.initializer);
  return parseType(ctx, type);
}
