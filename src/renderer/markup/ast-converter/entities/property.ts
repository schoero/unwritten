import { convertDescription } from "unwritten:renderer/markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer/markup/ast-converter/shared/example.js";
import { convertPosition } from "unwritten:renderer/markup/ast-converter/shared/position.js";
import { convertRemarks } from "unwritten:renderer/markup/ast-converter/shared/remarks.js";
import { convertTags } from "unwritten:renderer/markup/ast-converter/shared/tags.js";
import { convertType, convertTypeInline } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { createAnchor } from "unwritten:renderer/markup/utils/linker.js";
import { createAnchorNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";

import type { PropertyEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedPropertyEntityForDocumentation,
  ConvertedPropertyEntityForTableOfContents,
  ConvertedPropertyEntityForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertPropertyEntityForSignature(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity): ConvertedPropertyEntityForTableOfContents {
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

  const anchor = createAnchor(name, id);

  const convertedPosition = convertPosition(ctx, propertyEntity.position);
  const convertedTags = convertTags(ctx, propertyEntity);
  const convertedDescription = convertDescription(ctx, propertyEntity.description);
  const convertedRemarks = convertRemarks(ctx, propertyEntity.remarks);
  const convertedExample = convertExample(ctx, propertyEntity.example);
  const convertedType = convertType(ctx, propertyEntity.type);

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

  const convertedPosition = convertPosition(ctx, propertyEntity.position);
  const convertedTags = convertTags(ctx, propertyEntity);
  const convertedDescription = convertDescription(ctx, propertyEntity.description);
  const convertedRemarks = convertRemarks(ctx, propertyEntity.remarks);
  const convertedExample = convertExample(ctx, propertyEntity.example);
  const convertedType = convertTypeInline(ctx, propertyEntity.type);

  return [
    name,
    convertedPosition,
    convertedTags,
    convertedType,
    convertedDescription,
    convertedRemarks,
    convertedExample
  ];

}
