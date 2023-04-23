import { convertDescription } from "unwritten:renderer/markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer/markup/ast-converter/shared/example.js";
import { convertJSDocTags } from "unwritten:renderer/markup/ast-converter/shared/jsdoc-tags.js";
import { convertPosition } from "unwritten:renderer/markup/ast-converter/shared/position.js";
import { convertRemarks } from "unwritten:renderer/markup/ast-converter/shared/remarks.js";
import { renderModifiers } from "unwritten:renderer/markup/utils/modifiers.js";
import { convertType } from "unwritten:renderer:markup/ast-converter/index.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { createLinkNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { PropertyEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedPropertyEntityForDocumentation,
  ConvertedPropertyEntityForTableOfContents,
  ConvertedPropertyEntityForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertPropertyEntityForSignature(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity): ConvertedPropertyEntityForTableOfContents {

  const name = propertyEntity.name;

  return createLinkNode(
    name,
    propertyEntity.symbolId
  );

}

export function convertPropertyEntityForDocumentation(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity): ConvertedPropertyEntityForDocumentation {

  const renderConfig = getRenderConfig(ctx);
  const translate = getTranslator(ctx);

  const name = propertyEntity.name;

  const convertedPosition = convertPosition(ctx, propertyEntity.position);
  const convertedJSDocTags = convertJSDocTags(ctx, propertyEntity);
  const convertedDescription = convertDescription(ctx, propertyEntity.description);
  const convertedRemarks = convertRemarks(ctx, propertyEntity.remarks);
  const convertedExample = convertExample(ctx, propertyEntity.example);
  const convertedType = convertType(ctx, propertyEntity.type);

  const modifiers = propertyEntity.modifiers ? renderModifiers(ctx, propertyEntity.modifiers) : "";

  const optional = propertyEntity.optional === true
    ? encapsulate(translate("optional"), renderConfig.tagEncapsulation)
    : "";

  return createTitleNode(
    name,
    propertyEntity.symbolId,
    convertedJSDocTags,
    convertedPosition,
    convertedType,
    convertedDescription,
    convertedRemarks,
    convertedExample
  );

}

export function convertPropertyEntityForType(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity): ConvertedPropertyEntityForType {

  const renderConfig = getRenderConfig(ctx);
  const translate = getTranslator(ctx);

  const name = propertyEntity.name;

  const convertedPosition = convertPosition(ctx, propertyEntity.position);
  const convertedJSDocTags = convertJSDocTags(ctx, propertyEntity);
  const convertedDescription = convertDescription(ctx, propertyEntity.description);
  const convertedRemarks = convertRemarks(ctx, propertyEntity.remarks);
  const convertedExample = convertExample(ctx, propertyEntity.example);
  const convertedType = convertType(ctx, propertyEntity.type);

  const modifiers = propertyEntity.modifiers ? renderModifiers(ctx, propertyEntity.modifiers) : "";

  const optional = propertyEntity.optional === true
    ? encapsulate(translate("optional"), renderConfig.tagEncapsulation)
    : "";

  return [
    name,
    convertedPosition,
    convertedJSDocTags,
    convertedType,
    convertedDescription,
    convertedRemarks,
    convertedExample
  ];

}
