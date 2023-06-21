import {
  convertDescriptionForDocumentation,
  convertDescriptionForType
} from "unwritten:renderer/markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer/markup/ast-converter/shared/example.js";
import { convertPosition } from "unwritten:renderer/markup/ast-converter/shared/position.js";
import { convertRemarks } from "unwritten:renderer/markup/ast-converter/shared/remarks.js";
import {
  convertTagsForDocumentation,
  convertTagsForType
} from "unwritten:renderer/markup/ast-converter/shared/tags.js";
import {
  convertTypeForDocumentation,
  convertTypeForType,
  convertTypeForTypeMultiline
} from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { registerAnchor } from "unwritten:renderer/markup/utils/linker.js";
import { spaceBetween } from "unwritten:renderer/markup/utils/renderer.js";
import { isMultilineType } from "unwritten:renderer/markup/utils/types.js";
import { createAnchorNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";

import type { PropertyEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
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
  const id = propertyEntity.symbolId;

  const anchor = registerAnchor(ctx, name, id);

  const convertedPosition = convertPosition(ctx, propertyEntity.position);
  const convertedTags = convertTagsForDocumentation(ctx, propertyEntity);
  const convertedDescription = convertDescriptionForDocumentation(ctx, propertyEntity.description);
  const convertedRemarks = convertRemarks(ctx, propertyEntity.remarks);
  const convertedExample = convertExample(ctx, propertyEntity.example);
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

  const name = propertyEntity.name;

  const convertedTags = convertTagsForType(ctx, propertyEntity);
  const convertedDescription = convertDescriptionForType(ctx, propertyEntity.description);
  const convertedType = convertTypeForType(ctx, propertyEntity.type);
  const convertedTypeMultiline = isMultilineType(ctx, propertyEntity.type)
    ? convertTypeForTypeMultiline(ctx, propertyEntity.type)
    : "";

  return [
    spaceBetween(
      name,
      convertedTags,
      convertedType,
      convertedDescription
    ),
    convertedTypeMultiline
  ];

}
