import { renderType } from "unwritten:renderer:ts/ast/index.js";

import type { ParameterEntity } from "unwritten:compiler/type-definitions/entities.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:ts/type-definitions/renderer.js";


export function renderParameterEntities(ctx: TypeScriptRenderContext, parameterEntities: ParameterEntity[]): string {
  return parameterEntities.map(
    parameterEntity => renderParameterEntity(ctx, parameterEntity)
  ).join(", ");
}

export function renderParameterEntity(ctx: TypeScriptRenderContext, parameterEntity: ParameterEntity): string {

  const name = parameterEntity.name;

  const type = parameterEntity.type
    ? renderType(ctx, parameterEntity.type)
    : "";

  const initializer = parameterEntity.initializer
    ? ` = ${renderType(ctx, parameterEntity.initializer)}`
    : "";

  const optional = parameterEntity.optional === true
    ? "?"
    : "";

  const rest = parameterEntity.rest === true
    ? "..."
    : "";

  return `${rest}${name}${optional}: ${type}${initializer}`;

}
