import { ParameterDeclaration } from "typescript";

import { getIdByDeclaration } from "quickdoks:compiler:compositions/id.js";
import { getInitializerByDeclaration } from "quickdoks:compiler:compositions/initializer.js";
import { getParameterDescription } from "quickdoks:compiler:compositions/jsdoc.js";
import { getNameByDeclaration } from "quickdoks:compiler:compositions/name.js";
import { getPositionByDeclaration } from "quickdoks:compiler:compositions/position.js";
import { createTypeByDeclaration } from "quickdoks:compiler:entry-points/type.js";
import { CompilerContext } from "quickdoks:types:context.js";
import { Kind, Parameter } from "quickdoks:types:types.js";
import { assert } from "quickdoks:utils:general.js";


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
