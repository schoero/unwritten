import { convertType } from "unwritten:renderer/markup/ast-converter/index.js";
import { createWrapperNode } from "unwritten:renderer/markup/utils/nodes.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { ParameterEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type {
  ConvertedParameterEntitiesForSignature,
  ConvertedParameterEntityForDocumentation
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertParametersForSignature(ctx: MarkupRenderContexts, parameterEntities: ParameterEntity[]): ConvertedParameterEntitiesForSignature {
  return createWrapperNode(
    ...parameterEntities.map((parameter, index) => {
      const convertedParameter = convertParameterForSignature(ctx, parameter);
      if(index === 0){
        return createWrapperNode(
          parameter.optional === true ? "[" : "",
          convertedParameter,
          parameter.optional === true ? "]" : ""
        );
      } else {
        return createWrapperNode(
          parameter.optional === true ? "[, " : "",
          convertedParameter,
          parameter.optional === true ? "]" : ""
        );
      }
    })
  );
}


export function convertParameterForDocumentation(ctx: MarkupRenderContexts, parameterEntity: ParameterEntity): ConvertedParameterEntityForDocumentation {

  const renderConfig = getRenderConfig(ctx);

  const description = parameterEntity.description ?? "";
  const name = encapsulate(parameterEntity.name, renderConfig.parameterEncapsulation);

  const type = parameterEntity.type ? convertType(ctx, parameterEntity.type) : "";
  const rest = parameterEntity.rest === true ? encapsulate("rest", renderConfig.tagEncapsulation) : "";
  const optional = parameterEntity.optional === true ? encapsulate("optional", renderConfig.tagEncapsulation) : "";
  const initializer = parameterEntity.initializer !== undefined ? `Default: ${convertType(ctx, parameterEntity.initializer)}` : "";

  return createWrapperNode(
    `${name}:`,
    type,
    description,
    optional,
    rest,
    initializer
  );

}


function convertParameterForSignature(ctx: MarkupRenderContexts, parameterEntity: ParameterEntity): ConvertedParameterEntitiesForSignature {

  const rest = parameterEntity.rest === true ? "..." : "";
  const name = parameterEntity.name;

  return createWrapperNode(
    rest,
    name
  );

}
