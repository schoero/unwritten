import { Expression } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { Types } from "../../types/types.js";
import { isExpressionWithTypeArguments } from "../typeguards/expression.js";
import { parseType } from "./type.js";


/**
 * Type references must be handled by type node because the type would be the referenced type.
 */
export function parseExpression(ctx: CompilerContext, expression: Expression): Types {

  if(isExpressionWithTypeArguments(expression)){
    return parseExpression(ctx, expression.expression);
  }

  const type = ctx.checker.getTypeAtLocation(expression);
  return parseType(ctx, type);

}
