import { renderDescription } from "quickdoks:renderer/markup/mixins/description.js";
import { getRenderConfig } from "quickdoks:renderer:markup/utils/config.js";
import { encapsulate, spaceBetween } from "quickdoks:renderer:markup/utils/renderer.js";

import { renderType } from "./type.js";

import type { ParameterEntity } from "quickdoks:compiler:type-definitions/entities.js";
import type {
  MarkupRenderer,
  RenderedParameterForDocumentation,
  RenderedParameterForSignature,
  RenderedParametersForSignature
} from "quickdoks:renderer:markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


export function renderParametersForSignature(ctx: RenderContext<MarkupRenderer>, parameterEntities: ParameterEntity[]): RenderedParametersForSignature {
  return parameterEntities.map((parameter, index) => {
    const renderedParameter = renderParameterForSignature(ctx, parameter);
    if(index === 0){
      return parameter.optional === true ? `[${renderedParameter}]` : renderedParameter;
    } else {
      return parameter.optional === true ? `[, ${renderedParameter}]` : `, ${renderedParameter}`;
    }
  }).join("");
}


export function renderParameterForDocumentation(ctx: RenderContext<MarkupRenderer>, parameterEntity: ParameterEntity): RenderedParameterForDocumentation {

  const renderConfig = getRenderConfig(ctx);

  const description = renderDescription(ctx, parameterEntity.description) ?? "";
  const name = encapsulate(parameterEntity.name, renderConfig.parameterEncapsulation);
  const type = parameterEntity.type ? `${renderType(ctx, parameterEntity.type)}` : "";
  const rest = parameterEntity.rest === true ? encapsulate("rest", renderConfig.tagEncapsulation) : "";
  const optional = parameterEntity.optional === true ? encapsulate("optional", renderConfig.tagEncapsulation) : "";
  const initializer = parameterEntity.initializer !== undefined ? `Default: ${renderType(ctx, parameterEntity.initializer)}` : "";

  return `${name}: ${spaceBetween(type, description, optional, rest, initializer)}`;

}


function renderParameterForSignature(ctx: RenderContext<MarkupRenderer>, parameterEntity: ParameterEntity): RenderedParameterForSignature {
  const rest = parameterEntity.rest === true ? "..." : "";
  return `${rest}${parameterEntity.name}`;
}
