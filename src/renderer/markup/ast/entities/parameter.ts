import { renderType } from "unwritten:renderer/markup/ast/index.js";
import { renderDescription } from "unwritten:renderer:markup/shared/description.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";

import type { ParameterEntity } from "unwritten:compiler:type-definitions/entities.js";
import type {
  MarkupRenderContext,
  RenderedParameterForDocumentation,
  RenderedParameterForSignature,
  RenderedParametersForSignature
} from "unwritten:renderer:markup/types/renderer.js";


export function renderParametersForSignature(ctx: MarkupRenderContext, parameterEntities: ParameterEntity[]): RenderedParametersForSignature {
  return parameterEntities.map((parameter, index) => {
    const renderedParameter = renderParameterForSignature(ctx, parameter);
    if(index === 0){
      return parameter.optional === true ? `[${renderedParameter}]` : renderedParameter;
    } else {
      return parameter.optional === true ? `[, ${renderedParameter}]` : `, ${renderedParameter}`;
    }
  }).join("");
}


export function renderParameterForDocumentation(ctx: MarkupRenderContext, parameterEntity: ParameterEntity): RenderedParameterForDocumentation {

  const renderConfig = getRenderConfig(ctx);

  const description = renderDescription(ctx, parameterEntity.description) ?? "";
  const name = encapsulate(parameterEntity.name, renderConfig.parameterEncapsulation);
  const type = parameterEntity.type ? `${renderType(ctx, parameterEntity.type)}` : "";
  const rest = parameterEntity.rest === true ? encapsulate("rest", renderConfig.tagEncapsulation) : "";
  const optional = parameterEntity.optional === true ? encapsulate("optional", renderConfig.tagEncapsulation) : "";
  const initializer = parameterEntity.initializer !== undefined ? `Default: ${renderType(ctx, parameterEntity.initializer)}` : "";

  return `${name}: ${spaceBetween(type, description, optional, rest, initializer)}`;

}


function renderParameterForSignature(ctx: MarkupRenderContext, parameterEntity: ParameterEntity): RenderedParameterForSignature {
  const rest = parameterEntity.rest === true ? "..." : "";
  return `${rest}${parameterEntity.name}`;
}
