import { registerAnchor } from "unwritten:renderer/markup/registry/registry.js";
import {
  convertDescriptionForDocumentation,
  convertDescriptionForType
} from "unwritten:renderer:markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer:markup/ast-converter/shared/example.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { convertRemarks } from "unwritten:renderer:markup/ast-converter/shared/remarks.js";
import { createAnchorNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";

import type { PropertyEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedEventPropertyEntityForDocumentation,
  ConvertedEventPropertyEntityForTableOfContents,
  ConvertedEventPropertyEntityForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertEventPropertyEntityForTableOfContents(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity): ConvertedEventPropertyEntityForTableOfContents {
  const name = propertyEntity.name;
  const id = propertyEntity.symbolId;

  return createAnchorNode(
    name,
    id
  );
}


export function convertEventPropertyEntityForDocumentation(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity): ConvertedEventPropertyEntityForDocumentation {

  const name = propertyEntity.name;
  const symbolId = propertyEntity.symbolId;

  const anchor = registerAnchor(ctx, name, symbolId);

  const convertedPosition = convertPosition(ctx, propertyEntity.position);
  const convertedDescription = convertDescriptionForDocumentation(ctx, propertyEntity.description);
  const convertedRemarks = convertRemarks(ctx, propertyEntity.remarks);
  const convertedExample = convertExample(ctx, propertyEntity.example);

  return createTitleNode(
    name,
    anchor,
    convertedPosition,
    convertedDescription,
    convertedRemarks,
    convertedExample
  );

}

export function convertEventPropertyEntityForType(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity): ConvertedEventPropertyEntityForType {

  const name = propertyEntity.name;
  const convertedDescription = convertDescriptionForType(ctx, propertyEntity.description);

  return [
    spaceBetween(
      name,
      convertedDescription
    )
  ];

}