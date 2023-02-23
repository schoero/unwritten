import { convertType } from "unwritten:renderer/markup/ast-converter/index.js";
import { convertJSDocTags } from "unwritten:renderer/markup/ast-converter/shared/jsdoc-tags.js";
import { convertPosition } from "unwritten:renderer/markup/ast-converter/shared/position.js";
import {
  createLinkNode,
  createParagraphNode,
  createSmallNode,
  createTitleNode
} from "unwritten:renderer/markup/utils/nodes.js";
import { useTranslation } from "unwritten:renderer/markup/utils/translations.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { PropertyEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type {
  ConvertedPropertyEntityForDocumentation,
  ConvertedPropertyEntityForTableOfContents
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertPropertyEntityForSignature(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity): ConvertedPropertyEntityForTableOfContents {

  const name = propertyEntity.name;

  return createLinkNode(
    name,
    propertyEntity.id
  );

}

export function convertPropertyEntityForDocumentation(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity): ConvertedPropertyEntityForDocumentation {

  const renderConfig = getRenderConfig(ctx);
  const t = useTranslation(ctx);

  const name = propertyEntity.name;
  const description = propertyEntity.description ?? "";
  const example = propertyEntity.example ?? "";
  const remarks = propertyEntity.remarks ?? "";

  const jsdocTags = convertJSDocTags(ctx, propertyEntity);
  const position = propertyEntity.position ? convertPosition(ctx, propertyEntity.position) : "";
  const type = convertType(ctx, propertyEntity.type);

  const optional = propertyEntity.optional === true
    ? encapsulate(t("optional"), renderConfig.tagEncapsulation)
    : "";

  return createTitleNode(
    name,
    propertyEntity.id,
    [
      createSmallNode(position),
      createParagraphNode([
        jsdocTags,
        optional
      ]),
      createParagraphNode(type),
      createParagraphNode(description),
      createParagraphNode(remarks),
      createParagraphNode(example)
    ]
  );

}
