import { convertConstraintForType } from "unwritten:renderer/markup/ast-converter/shared/constraint.js";
import { convertInitializerForType } from "unwritten:renderer/markup/ast-converter/shared/initializer.js";
import { isMarkdownRenderContext } from "unwritten:renderer/markup/markdown/index.js";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import {
  createInlineTitleNode,
  createListNode,
  createMultilineNode,
  createParagraphNode,
  createSpanNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { TypeParameterEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
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
    translate("typeParameter", { capitalize: true, count: convertedTypeParameters.length }),
    convertedTypeParameterList
  );

}


export function convertTypeParameterEntitiesForType(ctx: MarkupRenderContexts, typeParameterEntities: TypeParameterEntity[] | undefined): ConvertedTypeParameterEntitiesForType {

  const translate = getTranslator(ctx);
  const renderConfig = getRenderConfig(ctx);

  if(!typeParameterEntities || typeParameterEntities.length === 0){
    return "";
  }

  const title = encapsulate(translate("typeParameter", { capitalizeEach: true, count: typeParameterEntities.length }), renderConfig.inlineTitleEncapsulation);

  const convertedTypeParameters = typeParameterEntities.map(
    typeParameter => convertTypeParameterEntityForType(ctx, typeParameter)
  );

  return createInlineTitleNode(
    title,
    createListNode(
      ...convertedTypeParameters
    )
  );

}

export function convertTypeParameterEntityForDocumentation(ctx: MarkupRenderContexts, typeParameterEntity: TypeParameterEntity): ConvertedTypeParameterEntityForDocumentation {

  const renderConfig = getRenderConfig(ctx);

  const description = typeParameterEntity.description ?? "";
  const name = encapsulate(typeParameterEntity.name, renderConfig.typeParameterEncapsulation);
  const symbolId = typeParameterEntity.symbolId;

  const constraint = typeParameterEntity.constraint &&
    convertConstraintForType(ctx, typeParameterEntity.constraint);

  const initializer = typeParameterEntity.initializer &&
     convertInitializerForType(ctx, typeParameterEntity.initializer);

  const nameAnchor = !isMarkdownRenderContext(ctx) ||
    (ctx.config.renderConfig[ctx.renderer.name].allowedHTMLTags as string[]).includes("span")
    ? createSpanNode(
      registerAnchor(ctx, typeParameterEntity.name, symbolId),
      name
    )
    : name;

  return createMultilineNode(
    createParagraphNode(
      spaceBetween(
        nameAnchor,
        constraint?.inlineConstraint ?? "",
        description,
        initializer?.inlineInitializer ?? ""
      )
    ),
    constraint?.multilineConstraint ?? "",
    initializer?.multilineInitializer ?? ""
  );

}

function convertTypeParameterEntityForType(ctx: MarkupRenderContexts, typeParameterEntity: TypeParameterEntity) {
  return convertTypeParameterEntityForDocumentation(ctx, typeParameterEntity);
}

function convertTypeParameterEntityForSignature(ctx: MarkupRenderContexts, typeParameterEntity: TypeParameterEntity) {
  return typeParameterEntity.name;
}
