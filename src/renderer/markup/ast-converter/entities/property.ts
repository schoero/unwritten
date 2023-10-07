import { registerAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import {
  convertDescriptionForDocumentation,
  convertDescriptionForType
} from "unwritten:renderer:markup/ast-converter/shared/description.js";
import {
  convertExamplesForDocumentation,
  convertExamplesForType
} from "unwritten:renderer:markup/ast-converter/shared/example.js";
import { convertPositionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import {
  convertRemarksForDocumentation,
  convertRemarksForType
} from "unwritten:renderer:markup/ast-converter/shared/remarks.js";
import {
  convertTagsForDocumentation,
  convertTagsForType
} from "unwritten:renderer:markup/ast-converter/shared/tags.js";
import { convertType, convertTypeForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/type.js";
import { createAnchorNode, createMultilineNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";

import type { PropertyEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedPropertyEntityForDocumentation,
  ConvertedPropertyEntityForTableOfContents,
  ConvertedPropertyEntityForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertPropertyEntityForTableOfContents(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity): ConvertedPropertyEntityForTableOfContents {
  const name = propertyEntity.name;
  const id = propertyEntity.symbolId;

  return createAnchorNode(
    name,
    id
  );
}


export function convertPropertyEntityForDocumentation(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity): ConvertedPropertyEntityForDocumentation {

  const name = propertyEntity.name;
  const symbolId = propertyEntity.symbolId;

  const anchor = registerAnchor(ctx, name, symbolId);

  const convertedPosition = convertPositionForDocumentation(ctx, propertyEntity.position);
  const convertedTags = convertTagsForDocumentation(ctx, propertyEntity);
  const convertedDescription = convertDescriptionForDocumentation(ctx, propertyEntity.description);
  const convertedRemarks = convertRemarksForDocumentation(ctx, propertyEntity.remarks);
  const convertedExample = convertExamplesForDocumentation(ctx, propertyEntity.example);
  const convertedType = convertTypeForDocumentation(ctx, propertyEntity.type);

  return createTitleNode(
    name,
    anchor,
    convertedTags,
    convertedPosition,
    convertedType,
    convertedDescription,
    convertedRemarks,
    convertedExample
  );

}

export function convertPropertyEntityForType(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity): ConvertedPropertyEntityForType {

  const renderConfig = getRenderConfig(ctx);

  const name = encapsulate(propertyEntity.name, renderConfig.propertyEncapsulation);
  const tags = convertTagsForType(ctx, propertyEntity);
  const description = convertDescriptionForType(ctx, propertyEntity.description);
  const remarks = convertRemarksForType(ctx, propertyEntity.remarks);
  const example = convertExamplesForType(ctx, propertyEntity.example);

  const { inlineType, multilineType } = convertType(ctx, propertyEntity.type);

  return createMultilineNode(
    spaceBetween(
      name,
      inlineType,
      description,
      tags
    ),
    remarks,
    example,
    multilineType
  );

}
