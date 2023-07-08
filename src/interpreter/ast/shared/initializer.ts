import {
  isParameterDeclaration,
  isPropertyAssignment,
  isPropertyDeclaration
} from "unwritten:interpreter/typeguards/declarations.js";
import { interpretType } from "unwritten:interpreter:ast/index.js";

import type { Declaration } from "typescript";

import type { Types } from "unwritten:interpreter:type-definitions/types.js";
import type { InterpreterContext } from "unwritten:type-definitions/context.js";


export function getInitializerByDeclaration(
  ctx: InterpreterContext,
  declaration: Declaration
): Types | undefined {
  if(!isParameterDeclaration(declaration) &&
    !isPropertyDeclaration(declaration) &&
    !isPropertyAssignment(declaration) ||
    !declaration.initializer){
    return;
  }
  const type = ctx.checker.getTypeAtLocation(declaration.initializer);
  return interpretType(ctx, type);
}
