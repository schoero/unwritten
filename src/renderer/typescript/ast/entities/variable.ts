import { renderType } from "unwritten:renderer/typescript/ast/index.js";

import type { VariableEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderVariableEntity(ctx: TypeScriptRenderContext, variableEntity: VariableEntity): string {

  const name = variableEntity.name;
  const renderedType = renderType(ctx, variableEntity.type);

  return `const ${name}: ${renderedType};`;

}
