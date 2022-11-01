import { RenderContext } from "../../../types/context.js";
import { Parameter } from "../../../types/types.js";
import { MarkupRenderer, RenderedParameterForDocumentation } from "../types/renderer.js";
import { getRenderConfig } from "../utils/config.js";
import { encapsulate, spaceBetween } from "../utils/renderer.js";
import { renderType } from "./type.js";


export function renderParametersForSignature(ctx: RenderContext<MarkupRenderer>, parameter: Parameter[]): string {

  let joinedParameters: string = "";

  for(let p = 0; p < parameter.length; p++){
    const renderedParameter = _renderParameterForSignature(ctx, parameter![p]!);
    if(p === 0){
      if(parameter![p]!.optional === true){
        joinedParameters += `[${renderedParameter}]`;
      } else {
        joinedParameters += renderedParameter;
      }
    } else {
      if(parameter![p]!.optional === true){
        joinedParameters += `[, ${renderedParameter}]`;
      } else {
        joinedParameters += `, ${renderedParameter}`;
      }
    }
  }

  return joinedParameters;

}


export function renderParameterForDocumentation(ctx: RenderContext<MarkupRenderer>, parameterEntity: Parameter): RenderedParameterForDocumentation {

  const renderConfig = getRenderConfig(ctx);

  const description = parameterEntity.description ? parameterEntity.description : "";
  const name = encapsulate(parameterEntity.name, renderConfig.parameterEncapsulation);
  const type = `${renderType(ctx, parameterEntity.type)}`;
  const rest = parameterEntity.rest === true ? encapsulate("rest", renderConfig.tagEncapsulation) : "";
  const optional = parameterEntity.optional === true ? encapsulate("optional", renderConfig.tagEncapsulation) : "";
  const initializer = parameterEntity.initializer !== undefined ? `Default: ${renderType(ctx, parameterEntity.initializer)}` : "";

  return `${name}: ${spaceBetween(type, description, optional, rest, initializer)}`;

}


function _renderParameterForSignature(ctx: RenderContext<MarkupRenderer>, parameterEntity: Parameter): string {
  const rest = parameterEntity.rest === true ? "..." : "";
  return `${rest}${parameterEntity.name}`;
}
