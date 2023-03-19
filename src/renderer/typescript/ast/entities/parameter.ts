import { renderType } from "unwritten:renderer:ts/ast/index.js";

import type { ParameterEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:ts/type-definitions/renderer.js";


export function renderParameterEntities(ctx: TypeScriptRenderContext, parameterEntities: ParameterEntity[]): string {
  return parameterEntities.map(
    parameterEntity => renderParameterEntity(ctx, parameterEntity)
  ).join(", ");
}

export function renderParameterEntity(ctx: TypeScriptRenderContext, parameterEntity: ParameterEntity): string {

  const renderedName = parameterEntity.name;

  const renderedType = parameterEntity.type
    ? renderType(ctx, parameterEntity.type)
    : "";

  const renderedInitializer = parameterEntity.initializer
    ? ` = ${renderType(ctx, parameterEntity.initializer)}`
    : "";

  const renderedQuestionMark = parameterEntity.optional === true
    ? "?"
    : "";

  const renderedDotDotDot = parameterEntity.rest === true
    ? "..."
    : "";

  return `${renderedDotDotDot}${renderedName}${renderedQuestionMark}: ${renderedType}${renderedInitializer}`;

}
