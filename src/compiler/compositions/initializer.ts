import { ParameterDeclaration } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Types } from "../../types/types.js";
import { createTypeByType } from "../types/type.js";


export function getInitializerByDeclaration(ctx: CompilerContext, declaration: ParameterDeclaration): Types | undefined {
  if(declaration.initializer === undefined){
    return;
  }
  const type = ctx.checker.getTypeAtLocation(declaration.initializer);
  return createTypeByType(ctx, type);
}