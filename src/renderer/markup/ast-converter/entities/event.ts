import {
  convertSeeTagsForDocumentation,
  convertSeeTagsForType
} from "unwritten:renderer/markup/ast-converter/shared/see.js";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { renderMemberContext } from "unwritten:renderer/markup/utils/context.js";
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
import { createAnchorNode, createMultilineNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";

import type { PropertyEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { AnchorNode } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedEventPropertyEntityForDocumentation,
  ConvertedEventPropertyEntityForTableOfContents,
  ConvertedEventPropertyEntityForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertEventPropertyEntityToAnchor(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity, displayName?: string): AnchorNode {

  const name = propertyEntity.name;
  const id = propertyEntity.symbolId;
  const documentationName = renderMemberContext(ctx, "documentation", name);
  const tableOfContentsName = renderMemberContext(ctx, "tableOfContents", name);

  displayName ??= tableOfContentsName;

  return createAnchorNode(
    documentationName,
    id,
    displayName
  );

}


export function convertEventPropertyEntityForTableOfContents(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity): ConvertedEventPropertyEntityForTableOfContents {
  return convertEventPropertyEntityToAnchor(ctx, propertyEntity);
}


export function convertEventPropertyEntityForDocumentation(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity): ConvertedEventPropertyEntityForDocumentation {

  const name = propertyEntity.name;
  const symbolId = propertyEntity.symbolId;

  const nameWithContext = renderMemberContext(ctx, "documentation", name);
  const anchor = registerAnchor(ctx, nameWithContext, symbolId);

  const position = convertPositionForDocumentation(ctx, propertyEntity.position);
  const description = propertyEntity.description && convertDescriptionForDocumentation(ctx, propertyEntity.description);
  const remarks = propertyEntity.remarks && convertRemarksForDocumentation(ctx, propertyEntity.remarks);
  const example = propertyEntity.example && convertExamplesForDocumentation(ctx, propertyEntity.example);
  const see = propertyEntity.see && convertSeeTagsForDocumentation(ctx, propertyEntity.see);

  return createTitleNode(
    nameWithContext,
    anchor,
    position,
    description,
    remarks,
    example,
    see
  );

}

export function convertEventPropertyEntityForType(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity): ConvertedEventPropertyEntityForType {

  const name = propertyEntity.name;
  const nameWithContext = renderMemberContext(ctx, "documentation", name);

  const description = propertyEntity.description && convertDescriptionForType(ctx, propertyEntity.description);
  const remarks = propertyEntity.remarks && convertRemarksForType(ctx, propertyEntity.remarks);
  const example = propertyEntity.example && convertExamplesForType(ctx, propertyEntity.example);
  const see = propertyEntity.see && convertSeeTagsForType(ctx, propertyEntity.see);

  return createMultilineNode(
    spaceBetween(
      nameWithContext,
      description
    ),
    remarks,
    example,
    see
  );

}
