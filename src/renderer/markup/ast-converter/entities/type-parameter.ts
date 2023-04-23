import { createListNode, createTitleNode } from "unwritten:renderer/markup/utils/nodes.js";
import { convertType } from "unwritten:renderer:markup/ast-converter/index.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { TypeParameterEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedTypeParameterEntitiesForDocumentation,
  ConvertedTypeParameterEntitiesForSignature,
  ConvertedTypeParameterEntitiesForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertTypeParameterEntitiesForSignature(ctx: MarkupRenderContexts, typeParameterEntities: TypeParameterEntity[]): ConvertedTypeParameterEntitiesForSignature {
  const convertedTypeParameters = typeParameterEntities.flatMap((typeParameter, index) => {
    const convertedTypeParameter = convertTypeParameterEntityForSignature(ctx, typeParameter);
    if(index === 0){
      return [convertedTypeParameter];
    } else {
      return [", ", convertedTypeParameter];
    }
  });

  return convertedTypeParameters;
}


export function convertTypeParameterEntitiesForDocumentation(ctx: MarkupRenderContexts, parameterEntities: TypeParameterEntity[] | undefined): ConvertedTypeParameterEntitiesForDocumentation {

  const t = getTranslator(ctx);

  const convertedParameters = parameterEntities?.map(
    parameter => convertTypeParameterEntityForDocumentation(ctx, parameter)
  ) ?? [];

  if(convertedParameters.length === 0){
    return "";
  }

  const convertedParameterList = createListNode(
    ...convertedParameters
  );

  return createTitleNode(
    t("type-parameter", { capitalize: true, count: 99 }),
    convertedParameterList
  );

}


export function convertTypeParameterEntitiesForType(ctx: MarkupRenderContexts, parameterEntities: TypeParameterEntity[] | undefined): ConvertedTypeParameterEntitiesForType {

  const convertedParameters = parameterEntities?.map(
    parameter => convertTypeParameterEntityForDocumentation(ctx, parameter)
  ) ?? [];

  if(convertedParameters.length === 0){
    return "";
  }

  const convertedParameterList = createListNode(
    ...convertedParameters
  );

  return convertedParameterList;

}


export function convertTypeParameterEntityForDocumentation(ctx: MarkupRenderContexts, typeParameterEntity: TypeParameterEntity) {

  const renderConfig = getRenderConfig(ctx);
  const translate = getTranslator(ctx);

  const description = typeParameterEntity.description ?? "";
  const name = encapsulate(typeParameterEntity.name, renderConfig.typeParameterEncapsulation);

  const constraint = typeParameterEntity.constraint
    ? convertType(ctx, typeParameterEntity.constraint)
    : "";

  const initializer = typeParameterEntity.initializer !== undefined
    ? spaceBetween(
      `${translate("default", { capitalize: true })}:`,
      convertType(ctx, typeParameterEntity.initializer)
    )
    : "";

  return spaceBetween(
    name,
    constraint,
    description,
    initializer
  );

}


function convertTypeParameterEntityForSignature(ctx: MarkupRenderContexts, typeParameterEntity: TypeParameterEntity) {
  const name = typeParameterEntity.name;
  return name;
}
