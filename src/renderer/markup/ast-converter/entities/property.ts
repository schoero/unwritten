import { renderModifiers } from "unwritten:renderer/markup/utils/modifiers.js";
import { convertType } from "unwritten:renderer:markup/ast-converter/index.js";
import { convertJSDocTags } from "unwritten:renderer:markup/ast-converter/shared/jsdoc-tags.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import {
  createLinkNode,
  createParagraphNode,
  createSmallNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { PropertyEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedPropertyEntityForDocumentation,
  ConvertedPropertyEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertPropertyEntityForSignature(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity): ConvertedPropertyEntityForTableOfContents {

  const name = propertyEntity.name;

  return createLinkNode(
    name,
    propertyEntity.id
  );

}

export function convertPropertyEntityForDocumentation(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity): ConvertedPropertyEntityForDocumentation {

  const renderConfig = getRenderConfig(ctx);
  const translate = getTranslator(ctx);

  const name = propertyEntity.name;
  const description = propertyEntity.description ?? "";
  const example = propertyEntity.example ?? "";
  const remarks = propertyEntity.remarks ?? "";
  const modifiers = propertyEntity.modifiers ? renderModifiers(ctx, propertyEntity.modifiers) : "";

  const jsdocTags = convertJSDocTags(ctx, propertyEntity);
  const position = propertyEntity.position ? convertPosition(ctx, propertyEntity.position) : "";
  const type = convertType(ctx, propertyEntity.type);

  const optional = propertyEntity.optional === true
    ? encapsulate(translate("optional"), renderConfig.tagEncapsulation)
    : "";

  return createTitleNode(
    name,
    propertyEntity.id,
    createSmallNode(position),
    createParagraphNode(
      jsdocTags,
      modifiers,
      optional
    ),
    createParagraphNode(type),
    createParagraphNode(description),
    createParagraphNode(remarks),
    createParagraphNode(example)
  );

}
