import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type.js";
import { createInlineTitleNode, createListNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { ParameterEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedParameterEntitiesForDocumentation,
  ConvertedParameterEntitiesForSignature,
  ConvertedParameterEntitiesForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertParameterEntitiesForSignature(ctx: MarkupRenderContexts, parameterEntities: ParameterEntity[] | undefined): ConvertedParameterEntitiesForSignature {

  if(parameterEntities === undefined){
    return "";
  }

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


export function convertParameterEntitiesForDocumentation(ctx: MarkupRenderContexts, parameterEntities: ParameterEntity[] | undefined): ConvertedParameterEntitiesForDocumentation {

  if(!parameterEntities || parameterEntities.length === 0){
    return "";
  }

  const translate = getTranslator(ctx);

  const parameters = parameterEntities.map(
    parameter => convertParameterEntityForDocumentation(ctx, parameter)
  );

  return createTitleNode(
    translate("parameter", { capitalize: true, count: parameters.length }),
    createListNode(
      ...parameters
    )
  );

}


export function convertParameterEntitiesForType(ctx: MarkupRenderContexts, parameterEntities: ParameterEntity[] | undefined): ConvertedParameterEntitiesForType {

  if(!parameterEntities || parameterEntities.length === 0){
    return "";
  }

  const renderConfig = getRenderConfig(ctx);
  const translate = getTranslator(ctx);

  const title = encapsulate(translate("parameter", { capitalizeEach: true, count: parameterEntities.length }), renderConfig.inlineTitleEncapsulation);

  const parameters = parameterEntities.map(
    parameter => convertParameterEntityForDocumentation(ctx, parameter)
  );

  return createInlineTitleNode(
    title,
    createListNode(
      ...parameters
    )
  );

}


function convertParameterEntityForDocumentation(ctx: MarkupRenderContexts, parameterEntity: ParameterEntity) {

  const renderConfig = getRenderConfig(ctx);
  const translate = getTranslator(ctx);

  const description = parameterEntity.description ?? "";
  const name = encapsulate(parameterEntity.name, renderConfig.parameterEncapsulation);

  const { inlineType, multilineType } = convertType(ctx, parameterEntity.type);

  const rest = parameterEntity.rest === true
    ? encapsulate(translate("rest"), renderConfig.tagEncapsulation)
    : "";

  const optional = parameterEntity.optional === true
    ? encapsulate(translate("optional"), renderConfig.tagEncapsulation)
    : "";

  const initializerTypes = parameterEntity.initializer !== undefined
    ? convertType(ctx, parameterEntity.initializer)
    : undefined;

  const initializer = initializerTypes !== undefined
    ? spaceBetween(
      `${translate("default", { capitalize: true })}:`,
      initializerTypes.multilineType ??
      initializerTypes.inlineType
    )
    : "";

  return [
    spaceBetween(
      name,
      inlineType,
      description,
      initializer,
      optional,
      rest
    ),
    multilineType ?? ""
  ];

}


function convertParameterEntityForSignature(ctx: MarkupRenderContexts, parameterEntity: ParameterEntity) {

  const rest = parameterEntity.rest === true ? "..." : "";
  const name = parameterEntity.name;

  return [
    rest,
    name
  ];

}
