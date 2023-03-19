import { renderJSDoc } from "unwritten:renderer/typescript/utils/jsdoc.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { renderType } from "unwritten:renderer:ts/ast/index.js";

import type { PropertyEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:ts/type-definitions/renderer.js";


export function renderPropertyEntity(ctx: TypeScriptRenderContext, propertyEntity: PropertyEntity): string {

  const renderedNewLine = renderNewLine(ctx);

  const renderedJSDoc = renderJSDoc(ctx, propertyEntity);
  const renderedType = renderType(ctx, propertyEntity.type);

  const renderedInitializer = propertyEntity.initializer
    ? ` = ${renderType(ctx, propertyEntity.initializer)}`
    : "";

  const renderedQuestionMark = propertyEntity.optional === true
    ? "?"
    : "";

  const renderedProperty = `${propertyEntity.name}${renderedQuestionMark}: ${renderedType}${renderedInitializer}`;

  return [
    renderedJSDoc,
    renderedProperty
  ].filter(line => line)
    .join(renderedNewLine);

}
