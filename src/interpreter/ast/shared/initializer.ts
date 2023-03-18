import { parseType } from "unwritten:interpreter/ast/index.js";

import type { ParameterDeclaration, PropertyAssignment, PropertyDeclaration, PropertySignature } from "typescript";

import type { Types } from "unwritten:interpreter/type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.d.js";


export function getInitializerByDeclaration(ctx: InterpreterContext, declaration: ParameterDeclaration | PropertyAssignment | PropertyDeclaration | PropertySignature): Types | undefined {
  if(declaration.initializer === undefined){
    return;
  }
  const type = ctx.checker.getTypeAtLocation(declaration.initializer);
  return parseType(ctx, type);
}
