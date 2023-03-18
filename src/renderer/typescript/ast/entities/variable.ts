import { renderType } from "unwritten:renderer:typescript/ast/index.js";
import { renderIndentation } from "unwritten:renderer:utils/indentation.js";

import type { VariableEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";


export function renderVariableEntity(ctx: TypeScriptRenderContext, variableEntity: VariableEntity): string {

  const name = variableEntity.name;
  const renderedIndentation = renderIndentation(ctx);
  const renderedType = renderType(ctx, variableEntity.type);

  return `${renderedIndentation}const ${name}: ${renderedType};`;

}
