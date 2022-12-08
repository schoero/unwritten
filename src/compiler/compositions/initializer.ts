import { ParameterDeclaration } from "typescript";

import { parseType } from "quickdoks:compiler:entry-points/type.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Types } from "quickdoks:types:types.js";


export function getInitializerByDeclaration(ctx: CompilerContext, declaration: ParameterDeclaration): Types | undefined {
  if(declaration.initializer === undefined){
    return;
  }
  const type = ctx.checker.getTypeAtLocation(declaration.initializer);
  return parseType(ctx, type);
}
