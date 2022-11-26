import { ParameterDeclaration } from "typescript";
import { assert } from "vitest";

import { CompilerContext } from "../../types/context.js";
import { Kind, Parameter } from "../../types/types.js";
import { getIdByDeclaration } from "../compositions/id.js";
import { getInitializerByDeclaration } from "../compositions/initializer.js";
import { getParameterDescription } from "../compositions/jsdoc.js";
import { getNameByDeclaration } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { createTypeByDeclaration } from "../entry-points/type.js";


export function createParameterByDeclaration(ctx: CompilerContext, declaration: ParameterDeclaration): Parameter {

  const name = getNameByDeclaration(ctx, declaration);
  const type = createTypeByDeclaration(ctx, declaration);
  const initializer = getInitializerByDeclaration(ctx, declaration);
  const id = getIdByDeclaration(ctx, declaration);
  const position = getPositionByDeclaration(ctx, declaration);
  const description = getParameterDescription(ctx, declaration);

  const optional = declaration.questionToken !== undefined;
  const rest = declaration.dotDotDotToken !== undefined;

  const kind = Kind.Parameter;

  assert(name, "Parameter name is missing.");
  assert(type, "Parameter type is missing.");

  return {
    description,
    id,
    initializer,
    kind,
    name,
    optional,
    position,
    rest,
    type
  };

}
