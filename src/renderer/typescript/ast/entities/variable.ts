import { renderJSDoc } from "unwritten:renderer/typescript/utils/jsdoc.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { renderType } from "unwritten:renderer:typescript/ast/index.js";
import { renderIndentation } from "unwritten:renderer:utils/indentation.js";

import type { VariableEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";


export function renderVariableEntity(ctx: TypeScriptRenderContext, variableEntity: VariableEntity): string {

  const renderedIndentation = renderIndentation(ctx);
  const renderedNewLine = renderNewLine(ctx);

  const renderedJSDoc = renderJSDoc(ctx, variableEntity);
  const renderedType = renderType(ctx, variableEntity.type);
  const renderedName = variableEntity.name;

  const renderedVariable = `${renderedIndentation}const ${renderedName}: ${renderedType};`;

  return [
    renderedJSDoc,
    renderedVariable
  ].filter(line => line)
    .join(renderedNewLine);

}
