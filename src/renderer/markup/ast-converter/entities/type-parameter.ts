import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { registerAnchor } from "unwritten:renderer/markup/utils/linker.js";
import { createListNode, createSpanNode, createTitleNode } from "unwritten:renderer/markup/utils/nodes.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { TypeParameterEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedTypeParameterEntitiesForDocumentation,
  ConvertedTypeParameterEntitiesForSignature,
  ConvertedTypeParameterEntitiesForType,
  ConvertedTypeParameterEntityForDocumentation
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

  if(parameterEntities === undefined || parameterEntities.length === 0){
    return "";
  }

  const translate = getTranslator(ctx);

  const convertedTypeParameters = parameterEntities.map(
    parameter => convertTypeParameterEntityForDocumentation(ctx, parameter)
  );

  const convertedTypeParameterList = createListNode(
    ...convertedTypeParameters
  );

  return createTitleNode(
    translate("type-parameter", { capitalize: true, count: convertedTypeParameters.length }),
    convertedTypeParameterList
  );

}


export function convertTypeParameterEntitiesForType(ctx: MarkupRenderContexts, typeParameterEntities: TypeParameterEntity[] | undefined): ConvertedTypeParameterEntitiesForType {

  if(typeParameterEntities === undefined){
    return "";
  }

  const convertedTypeParameters = typeParameterEntities.map(
    typeParameter => convertTypeParameterEntityForDocumentation(ctx, typeParameter)
  );

  return createListNode(
    ...convertedTypeParameters
  );

}

export function convertTypeParameterEntityForDocumentation(ctx: MarkupRenderContexts, typeParameterEntity: TypeParameterEntity): ConvertedTypeParameterEntityForDocumentation {

  const renderConfig = getRenderConfig(ctx);
  const translate = getTranslator(ctx);

  const description = typeParameterEntity.description ?? "";
  const name = encapsulate(typeParameterEntity.name, renderConfig.typeParameterEncapsulation);

  const constrainTypes = typeParameterEntity.constraint
    ? convertType(ctx, typeParameterEntity.constraint)
    : undefined;

  const constraint = constrainTypes
    ? constrainTypes.multilineType ?? constrainTypes.inlineType
    : "";

  const initializerTypes = typeParameterEntity.initializer !== undefined
    ? convertType(ctx, typeParameterEntity.initializer)
    : undefined;

  const initializer = initializerTypes !== undefined
    ? spaceBetween(
      `${translate("default", { capitalize: true })}:`,
      initializerTypes.multilineType ??
      initializerTypes.inlineType
    )
    : "";

  const anchor = registerAnchor(ctx, typeParameterEntity.name, typeParameterEntity.symbolId);

  return spaceBetween(
    createSpanNode(anchor, name),
    constraint,
    description,
    initializer
  );

}


function convertTypeParameterEntityForSignature(ctx: MarkupRenderContexts, typeParameterEntity: TypeParameterEntity) {
  const name = typeParameterEntity.name;
  return name;
}
