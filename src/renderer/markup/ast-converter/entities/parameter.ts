import { convertType } from "unwritten:renderer:markup/ast-converter/index.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { ParameterEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedParameterEntitiesForSignature,
  ConvertedParameterEntityForDocumentation,
  ConvertedParameterEntityForSignature
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertParameterEntitiesForSignature(ctx: MarkupRenderContexts, parameterEntities: ParameterEntity[]): ConvertedParameterEntitiesForSignature {
  const renderedParameters = parameterEntities.flatMap((parameter, index) => {
    const convertedParameter = convertParameterEntityForSignature(ctx, parameter);
    if(index === 0){
      return [
        parameter.optional === true ? "[" : "",
        ...convertedParameter,
        parameter.optional === true ? "]" : ""
      ];
    } else {
      return [
        parameter.optional === true ? "[, " : ", ",
        ...convertedParameter,
        parameter.optional === true ? "]" : ""
      ];
    }
  });
  return renderedParameters;
}


export function convertParameterEntityForDocumentation(ctx: MarkupRenderContexts, parameterEntity: ParameterEntity): ConvertedParameterEntityForDocumentation {

  const renderConfig = getRenderConfig(ctx);
  const translate = getTranslator(ctx);

  const description = parameterEntity.description ?? "";
  const name = encapsulate(parameterEntity.name, renderConfig.parameterEncapsulation);

  const type = parameterEntity.type
    ? convertType(ctx, parameterEntity.type)
    : "";

  const rest = parameterEntity.rest === true
    ? encapsulate(translate("rest"), renderConfig.tagEncapsulation)
    : "";

  const optional = parameterEntity.optional === true
    ? encapsulate(translate("optional"), renderConfig.tagEncapsulation)
    : "";

  const initializer = parameterEntity.initializer !== undefined
    ? spaceBetween(
      `${translate("default", { capitalize: true })}:`,
      convertType(ctx, parameterEntity.initializer)
    )
    : "";

  return spaceBetween(
    name,
    type,
    description,
    optional,
    rest,
    initializer
  );

}


function convertParameterEntityForSignature(ctx: MarkupRenderContexts, parameterEntity: ParameterEntity): ConvertedParameterEntityForSignature {

  const rest = parameterEntity.rest === true ? "..." : "";
  const name = parameterEntity.name;

  return [
    rest,
    name
  ];

}
