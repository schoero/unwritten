import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type";
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
import { convertDescriptionForType } from "unwritten:renderer/markup/ast-converter/shared/description";
import { convertInitializerForType } from "unwritten:renderer/markup/ast-converter/shared/initializer";
import { isMarkdownRenderContext } from "unwritten:renderer/markup/markdown/index";
import { registerAnchor, registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry";
import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { ParameterEntity } from "unwritten:interpreter:type-definitions/entities";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedParameterEntitiesForDocumentation,
  ConvertedParameterEntitiesForSignature,
  ConvertedParameterEntitiesForType
} from "unwritten:renderer:markup/types-definitions/renderer";
import type { AnchorNode } from "unwritten:renderer/markup/types-definitions/nodes";


export function convertParameterEntityToAnchor(ctx: MarkupRenderContext, parameterEntity: ParameterEntity, displayName?: string): AnchorNode {

  const name = parameterEntity.name;
  const id = parameterEntity.symbolId;

  return createAnchorNode(
    name,
    id,
    displayName
  );

}

export function convertParameterEntitiesForSignature(ctx: MarkupRenderContext, parameterEntities: ParameterEntity[] | undefined): ConvertedParameterEntitiesForSignature {

  if(parameterEntities === undefined){
    return undefined;
  }

  const renderConfig = getRenderConfig(ctx);

  const renderedParameters = parameterEntities.flatMap((parameterEntity, index) => {
    const convertedParameter = convertParameterEntityForSignature(ctx, parameterEntity);

    if(index === 0){
      return [
        parameterEntity.optional === true ||
        renderConfig.renderDefaultValuesAsOptional && parameterEntity.initializer
          ? "["
          : "",
        ...convertedParameter,
        parameterEntity.optional === true ||
        renderConfig.renderDefaultValuesAsOptional && parameterEntity.initializer
          ? "]"
          : ""
      ];
    } else {
      return [
        parameterEntity.optional === true ||
        renderConfig.renderDefaultValuesAsOptional && parameterEntity.initializer
          ? "[, "
          : ", ",
        ...convertedParameter,
        parameterEntity.optional === true ||
        renderConfig.renderDefaultValuesAsOptional && parameterEntity.initializer
          ? "]"
          : ""
      ];
    }
  });

  return renderedParameters;

}


export function convertParameterEntitiesForDocumentation(ctx: MarkupRenderContext, parameterEntities: ParameterEntity[] | undefined): ConvertedParameterEntitiesForDocumentation {

  if(!parameterEntities || parameterEntities.length === 0){
    return undefined;
  }

  const translate = getTranslator(ctx);

  const parameters = parameterEntities.map(
    parameter => convertParameterEntityForDocumentation(ctx, parameter)
  );

  const parameterTranslation = translate("parameter", { capitalize: true, count: parameters.length });
  const parameterAnchor = registerAnonymousAnchor(ctx, parameterTranslation);

  return createTitleNode(
    parameterTranslation,
    parameterAnchor,
    createListNode(
      ...parameters
    )
  );

}


export function convertParameterEntitiesForType(ctx: MarkupRenderContext, parameterEntities: ParameterEntity[] | undefined): ConvertedParameterEntitiesForType {

  if(!parameterEntities || parameterEntities.length === 0){
    return undefined;
  }

  const translate = getTranslator(ctx);

  const title = translate("parameter", { capitalizeEach: true, count: parameterEntities.length });
  const anchor = registerAnonymousAnchor(ctx, title);

  const parameters = parameterEntities.map(
    parameter => convertParameterEntityForDocumentation(ctx, parameter)
  );

  return createInlineTitleNode(
    title,
    anchor,
    createListNode(
      ...parameters
    )
  );

}


function convertParameterEntityForDocumentation(ctx: MarkupRenderContext, parameterEntity: ParameterEntity) {

  const renderConfig = getRenderConfig(ctx);
  const translate = getTranslator(ctx);

  const name = encapsulate(parameterEntity.name, renderConfig.parameterEncapsulation);
  const symbolId = parameterEntity.symbolId;

  const nameAnchor = !isMarkdownRenderContext(ctx) ||
    Array.isArray(ctx.config.renderConfig[ctx.renderer.name].allowedHTMLTags) &&
    (ctx.config.renderConfig[ctx.renderer.name].allowedHTMLTags as string[]).includes("span")
    ? createSpanNode(
      registerAnchor(ctx, parameterEntity.name, symbolId),
      name
    )
    : name;

  const description = parameterEntity.description && convertDescriptionForType(ctx, parameterEntity.description);
  const rest = parameterEntity.rest === true && encapsulate(translate("rest"), renderConfig.tagEncapsulation);
  const optional = (parameterEntity.optional === true || renderConfig.renderDefaultValuesAsOptional && parameterEntity.initializer) &&
    encapsulate(translate("optional"), renderConfig.tagEncapsulation);
  const initializer = parameterEntity.initializer && convertInitializerForType(ctx, parameterEntity.initializer);

  const { inlineType, multilineType } = convertType(ctx, parameterEntity.type);

  return createMultilineNode(
    createParagraphNode(
      spaceBetween(
        nameAnchor,
        inlineType,
        description,
        rest,
        optional,
        initializer?.inlineInitializer
      )
    ),
    multilineType,
    initializer?.multilineInitializer
  );

}


function convertParameterEntityForSignature(ctx: MarkupRenderContext, parameterEntity: ParameterEntity) {

  const rest = parameterEntity.rest === true ? "..." : "";
  const name = parameterEntity.name;

  return [
    rest,
    name
  ];

}
