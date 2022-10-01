import { ParameterDeclaration } from "typescript";
import { assert } from "vitest";

import { EntityKind, Parameter } from "../../types/types.js";
import { getIdByDeclaration } from "../compositions/id.js";
import { getParameterDescription } from "../compositions/jsdoc.js";
import { getNameByDeclaration } from "../compositions/name.js";
import { getPositionByDeclaration } from "../compositions/position.js";
import { getTypeByDeclaration } from "../compositions/type.js";


export function createParameter(declaration: ParameterDeclaration): Parameter {

  const name = getNameByDeclaration(declaration);
  const type = getTypeByDeclaration(declaration);
  const id = getIdByDeclaration(declaration);
  const position = getPositionByDeclaration(declaration);
  const description = getParameterDescription(declaration);

  const optional = declaration.questionToken != null;
  const rest = declaration.dotDotDotToken != null;

  const kind = EntityKind.Parameter;

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
