import { renderNode } from "unwritten:renderer/index";
import { convertConstraintForType } from "unwritten:renderer/markup/ast-converter/shared/constraint";
import { convertInitializerForType } from "unwritten:renderer/markup/ast-converter/shared/initializer";
import { convertJSDocNodes } from "unwritten:renderer/markup/ast-converter/shared/jsdoc";
import { isMarkdownRenderContext } from "unwritten:renderer/markup/markdown/index";
import { registerAnchor, registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import {
  createAnchorNode,
  createInlineTitleNode,
  createListNode,
  createMultilineNode,
  createParagraphNode,
  createSpanNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer";
import { getTranslator } from "unwritten:renderer:markup/utils/translations";

import type { TypeParameterEntity } from "unwritten:interpreter:type-definitions/entities";
import type { AnchorNode } from "unwritten:renderer/markup/types-definitions/nodes";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedTypeParameterEntitiesForDocumentation,
  ConvertedTypeParameterEntitiesForSignature,
  ConvertedTypeParameterEntitiesForType,
  ConvertedTypeParameterEntityForDocumentation
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertTypeParameterEntityToAnchor(ctx: MarkupRenderContext, typeParameterEntity: TypeParameterEntity, displayName?: string): AnchorNode {

  const name = typeParameterEntity.name;
  const id = typeParameterEntity.symbolId;

  return createAnchorNode(
    name,
    id,
    displayName
  );

}

export function convertTypeParameterEntitiesForSignature(ctx: MarkupRenderContext, typeParameterEntities: TypeParameterEntity[]): ConvertedTypeParameterEntitiesForSignature {
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


export function convertTypeParameterEntitiesForDocumentation(ctx: MarkupRenderContext, parameterEntities: TypeParameterEntity[] | undefined): ConvertedTypeParameterEntitiesForDocumentation {

  if(parameterEntities === undefined || parameterEntities.length === 0){
    return;
  }

  const translate = getTranslator(ctx);

  const convertedTypeParameters = parameterEntities.map(
    parameter => convertTypeParameterEntityForDocumentation(ctx, parameter)
  );

  const convertedTypeParameterList = createListNode(
    ...convertedTypeParameters
  );

  const typeParametersTranslation = translate("typeParameter", { capitalize: true, count: convertedTypeParameters.length });
  const typeParametersAnchor = registerAnonymousAnchor(ctx, typeParametersTranslation);

  return createTitleNode(
    typeParametersTranslation,
    typeParametersAnchor,
    convertedTypeParameterList
  );

}


export function convertTypeParameterEntitiesForType(ctx: MarkupRenderContext, typeParameterEntities: TypeParameterEntity[] | undefined): ConvertedTypeParameterEntitiesForType {

  const translate = getTranslator(ctx);
  const renderConfig = getRenderConfig(ctx);

  if(!typeParameterEntities || typeParameterEntities.length === 0){
    return;
  }

  const title = renderNode(ctx, encapsulate(translate("typeParameter", { capitalizeEach: true, count: typeParameterEntities.length }), renderConfig.inlineTitleEncapsulation));
  const anchor = registerAnonymousAnchor(ctx, title);

  const convertedTypeParameters = typeParameterEntities.map(
    typeParameter => convertTypeParameterEntityForType(ctx, typeParameter)
  );

  return createInlineTitleNode(
    title,
    anchor,
    createListNode(
      ...convertedTypeParameters
    )
  );

}

export function convertTypeParameterEntityForDocumentation(ctx: MarkupRenderContext, typeParameterEntity: TypeParameterEntity): ConvertedTypeParameterEntityForDocumentation {

  const renderConfig = getRenderConfig(ctx);

  const name = encapsulate(typeParameterEntity.name, renderConfig.typeParameterEncapsulation);
  const symbolId = typeParameterEntity.symbolId;

  const description = typeParameterEntity.description
    ? convertJSDocNodes(ctx, typeParameterEntity.description)
    : [];

  const constraint = typeParameterEntity.constraint &&
    convertConstraintForType(ctx, typeParameterEntity.constraint);

  const initializer = typeParameterEntity.initializer &&
    convertInitializerForType(ctx, typeParameterEntity.initializer);

  const nameAnchor = !isMarkdownRenderContext(ctx) ||
    Array.isArray(ctx.config.renderConfig[ctx.renderer.name].allowedHTMLTags) &&
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
        constraint?.inlineConstraint,
        description,
        initializer?.inlineInitializer
      )
    ),
    constraint?.multilineConstraint,
    initializer?.multilineInitializer
  );

}

function convertTypeParameterEntityForType(ctx: MarkupRenderContext, typeParameterEntity: TypeParameterEntity) {
  return convertTypeParameterEntityForDocumentation(ctx, typeParameterEntity);
}

function convertTypeParameterEntityForSignature(ctx: MarkupRenderContext, typeParameterEntity: TypeParameterEntity) {
  return typeParameterEntity.name;
}
