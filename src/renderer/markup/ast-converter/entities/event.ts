import {
  convertDescriptionForDocumentation,
  convertDescriptionForType
} from "unwritten:renderer:markup/ast-converter/shared/description";
import {
  convertExamplesForDocumentation,
  convertExamplesForType
} from "unwritten:renderer:markup/ast-converter/shared/example";
import { convertPositionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/position";
import {
  convertRemarksForDocumentation,
  convertRemarksForType
} from "unwritten:renderer:markup/ast-converter/shared/remarks";
import {
  createAnchorNode,
  createMultilineNode,
  createSectionNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes";
import { renderEntityPrefix, spaceBetween } from "unwritten:renderer:markup/utils/renderer";
import {
  convertSeeTagsForDocumentation,
  convertSeeTagsForType
} from "unwritten:renderer/markup/ast-converter/shared/see";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry";
import { getSectionType } from "unwritten:renderer/markup/types-definitions/sections.js";
import { renderMemberContext } from "unwritten:renderer/markup/utils/context";

import type { PropertyEntity } from "unwritten:interpreter:type-definitions/entities";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedEventPropertyEntityForDocumentation,
  ConvertedEventPropertyEntityForTableOfContents,
  ConvertedEventPropertyEntityForType
} from "unwritten:renderer:markup/types-definitions/renderer";
import type { AnchorNode } from "unwritten:renderer/markup/types-definitions/nodes";


export function convertEventPropertyEntityToAnchor(ctx: MarkupRenderContext, propertyEntity: PropertyEntity, displayName?: string): AnchorNode {

  const name = propertyEntity.name;
  const id = propertyEntity.symbolId;

  const documentationEntityPrefix = renderEntityPrefix(ctx, "documentation", propertyEntity.kind);
  const documentationName = renderMemberContext(ctx, "documentation", name);

  const tableOfContentsName = renderMemberContext(ctx, "tableOfContents", name);
  const tableOfContentsEntityPrefix = renderEntityPrefix(ctx, "tableOfContents", propertyEntity.kind);

  const prefixedDocumentationName = documentationEntityPrefix
    ? `${documentationEntityPrefix}: ${documentationName}`
    : documentationName;

  const prefixedTableOfContentsName = tableOfContentsEntityPrefix
    ? `${tableOfContentsEntityPrefix}: ${tableOfContentsName}`
    : tableOfContentsName;

  displayName ??= prefixedTableOfContentsName;

  return createAnchorNode(
    prefixedDocumentationName,
    id,
    displayName
  );

}


export function convertEventPropertyEntityForTableOfContents(ctx: MarkupRenderContext, propertyEntity: PropertyEntity): ConvertedEventPropertyEntityForTableOfContents {
  return convertEventPropertyEntityToAnchor(ctx, propertyEntity);
}


export function convertEventPropertyEntityForDocumentation(ctx: MarkupRenderContext, propertyEntity: PropertyEntity): ConvertedEventPropertyEntityForDocumentation {

  const name = propertyEntity.name;
  const symbolId = propertyEntity.symbolId;

  const entityPrefix = renderEntityPrefix(ctx, "documentation", propertyEntity.kind);
  const nameWithContext = renderMemberContext(ctx, "documentation", name);

  const prefixedDocumentationName = entityPrefix
    ? `${entityPrefix}: ${nameWithContext}`
    : nameWithContext;

  const anchor = registerAnchor(ctx, prefixedDocumentationName, symbolId);

  const position = convertPositionForDocumentation(ctx, propertyEntity.position);
  const description = propertyEntity.description && convertDescriptionForDocumentation(ctx, propertyEntity.description);
  const remarks = propertyEntity.remarks && convertRemarksForDocumentation(ctx, propertyEntity.remarks);
  const example = propertyEntity.example && convertExamplesForDocumentation(ctx, propertyEntity.example);
  const see = propertyEntity.see && convertSeeTagsForDocumentation(ctx, propertyEntity.see);

  return createSectionNode(
    getSectionType(propertyEntity.kind),
    createTitleNode(
      prefixedDocumentationName,
      anchor,
      position,
      description,
      remarks,
      example,
      see
    )
  );

}

export function convertEventPropertyEntityForType(ctx: MarkupRenderContext, propertyEntity: PropertyEntity): ConvertedEventPropertyEntityForType {

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
