import { RenderedParameterForDocumentation } from "src/types/renderer.js";

import { config } from "../../config/index.js";
import { ParameterEntity } from "../../types/entities.js";
import { encapsulate, spaceBetween } from "../../utils/renderer.js";
import { renderType } from "./type.js";


export function renderParameterEntityForSignature(parameterEntity: ParameterEntity): string {
  const rest = parameterEntity.rest === true ? "..." : "";
  return `${rest}${parameterEntity.name}`;
}

export function renderParameterEntitiesForSignature(parameterEntities: ParameterEntity[]): string {

  let joinedParameters: string = "";

  for(let p = 0; p < parameterEntities.length; p++){
    const renderedParameter = renderParameterEntityForSignature(parameterEntities![p]!);
    if(p === 0){
      if(parameterEntities![p]!.optional === true){
        joinedParameters += `[${renderedParameter}]`;
      } else {
        joinedParameters += renderedParameter;
      }
    } else {
      if(parameterEntities![p]!.optional === true){
        joinedParameters += `[, ${renderedParameter}]`;
      } else {
        joinedParameters += `, ${ renderedParameter}`;
      }
    }
  }

  return joinedParameters;

}


export function renderParameterEntityForDocumentation(parameterEntity: ParameterEntity): RenderedParameterForDocumentation {

  const description = parameterEntity.description ? parameterEntity.description : "";
  const name = encapsulate(parameterEntity.name, config.renderConfig.parameterEncapsulation);
  const type = `${renderType(parameterEntity.type)}`;
  const rest = parameterEntity.rest === true ? encapsulate("rest", config.renderConfig.tagEncapsulation) : "";
  const optional = parameterEntity.optional === true ? encapsulate("optional", config.renderConfig.tagEncapsulation) : "";
  const initializer = parameterEntity.initializer !== undefined ? `Default: ${renderType(parameterEntity.initializer)}` : "";

  return `${name}: ${spaceBetween(type, description, rest, optional, initializer)}`;

}