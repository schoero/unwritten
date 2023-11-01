import {
  isParameterDeclaration,
  isPropertyAssignment,
  isPropertyDeclaration
} from "unwritten:interpreter/typeguards/declarations";

import { getTypeByType } from "../type";

import type { Declaration } from "typescript";

import type { Type } from "unwritten:interpreter:type-definitions/types";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function getInitializerByDeclaration(
  ctx: InterpreterContext,
  declaration: Declaration
): Type | undefined {
  if(!isParameterDeclaration(ctx, declaration) &&
    !isPropertyDeclaration(ctx, declaration) &&
    !isPropertyAssignment(ctx, declaration) ||
    !declaration.initializer){
    return;
  }
  const type = ctx.checker.getTypeAtLocation(declaration.initializer);
  return getTypeByType(ctx, type);
}
