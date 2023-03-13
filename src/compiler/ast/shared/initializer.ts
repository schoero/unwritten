import { parseType } from "unwritten:compiler:ast/index.js";

import type { ParameterDeclaration, PropertyAssignment, PropertyDeclaration, PropertySignature } from "typescript";

import type { Types } from "unwritten:compiler:type-definitions/types.d.js";
import type { CompilerContext } from "unwritten:type-definitions/context.d.js";


export function getInitializerByDeclaration(ctx: CompilerContext, declaration: ParameterDeclaration | PropertyAssignment | PropertyDeclaration | PropertySignature): Types | undefined {
  if(declaration.initializer === undefined){
    return;
  }
  const type = ctx.checker.getTypeAtLocation(declaration.initializer);
  return parseType(ctx, type);
}
