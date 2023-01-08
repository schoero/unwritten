import { getRenderConfig } from "quickdoks:renderer:markup/utils/config.js";
import { encapsulate, spaceBetween } from "quickdoks:renderer:markup/utils/renderer.js";

import { renderType } from "./type.js";

import type { ParameterEntity } from "quickdoks:compiler:type-definitions/entities.js";
import type { MarkupRenderer, RenderedParameterForDocumentation } from "quickdoks:renderer:markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


export function renderParametersForSignature(ctx: RenderContext<MarkupRenderer>, parameter: ParameterEntity[]): string {

  let joinedParameters: string = "";

  for(let p = 0; p < parameter.length; p++){
    const renderedParameter = renderParameterForSignature(ctx, parameter[p]!);
    if(p === 0){
      if(parameter[p]!.optional === true){
        joinedParameters += `[${renderedParameter}]`;
      } else {
        joinedParameters += renderedParameter;
      }
    } else {
      if(parameter[p]!.optional === true){
        joinedParameters += `[, ${renderedParameter}]`;
      } else {
        joinedParameters += `, ${renderedParameter}`;
      }
    }
  }

  return joinedParameters;

}


export function renderParameterForDocumentation(ctx: RenderContext<MarkupRenderer>, parameterEntity: ParameterEntity): RenderedParameterForDocumentation {

  const renderConfig = getRenderConfig(ctx);

  const description = parameterEntity.description ? parameterEntity.description : "";
  const name = encapsulate(parameterEntity.name, renderConfig.parameterEncapsulation);
  const type = `${renderType(ctx, parameterEntity.type)}`;
  const rest = parameterEntity.rest === true ? encapsulate("rest", renderConfig.tagEncapsulation) : "";
  const optional = parameterEntity.optional === true ? encapsulate("optional", renderConfig.tagEncapsulation) : "";
  const initializer = parameterEntity.initializer !== undefined ? `Default: ${renderType(ctx, parameterEntity.initializer)}` : "";

  return `${name}: ${spaceBetween(type, description, optional, rest, initializer)}`;

}


function renderParameterForSignature(ctx: RenderContext<MarkupRenderer>, parameterEntity: ParameterEntity): string {
  const rest = parameterEntity.rest === true ? "..." : "";
  return `${rest}${parameterEntity.name}`;
}
