import { ParameterDeclaration } from "typescript";
import { assert } from "vitest";

import { CompilerContext } from "../../types/context.js";
import { Parameter, TypeKind } from "../../types/types.js";
import { getIdByDeclaration } from "../compositions/id.js";
import { getParameterDescription } from "../compositions/jsdoc.js";
import { getNameByDeclaration } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { createTypeByDeclaration } from "./type.js";


export function createParameter(ctx: CompilerContext, declaration: ParameterDeclaration): Parameter {

  const name = getNameByDeclaration(ctx, declaration);
  const type = createTypeByDeclaration(ctx, declaration);
  const id = getIdByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const description = getParameterDescription(ctx, declaration);

  const optional = declaration.questionToken != null;
  const rest = declaration.dotDotDotToken != null;

  const kind = TypeKind.Parameter;

  assert(name, "Parameter name is missing.");
  assert(type, "Parameter type is missing.");

  return {
    description,
    id,
    kind,
    name,
    optional,
    position,
    rest,
    type
  };

}
