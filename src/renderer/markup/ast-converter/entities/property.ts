import {
  convertSeeTagsForDocumentation,
  convertSeeTagsForType
} from "unwritten:renderer/markup/ast-converter/shared/see";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry";
import { getSectionType } from "unwritten:renderer/markup/types-definitions/sections.js";
import { renderMemberContext } from "unwritten:renderer/markup/utils/context";
import { getRenderConfig } from "unwritten:renderer/utils/config";
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
import { convertTagsForDocumentation, convertTagsForType } from "unwritten:renderer:markup/ast-converter/shared/tags";
import { convertType, convertTypeForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/type";
import {
  createAnchorNode,
  createMultilineNode,
  createSectionNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer";

import type { PropertyEntity } from "unwritten:interpreter/type-definitions/entities";
import type { AnchorNode } from "unwritten:renderer/markup/types-definitions/nodes";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedPropertyEntityForDocumentation,
  ConvertedPropertyEntityForTableOfContents,
  ConvertedPropertyEntityForType
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertPropertyEntityToAnchor(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity, displayName?: string): AnchorNode {

  const id = propertyEntity.symbolId;
  const name = propertyEntity.name;
  const documentationName = renderMemberContext(ctx, "documentation", name);
  const tableOfContentsName = renderMemberContext(ctx, "tableOfContents", name);

  displayName ??= tableOfContentsName;

  return createAnchorNode(
    documentationName,
    id,
    displayName
  );

}


export function convertPropertyEntityForTableOfContents(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity): ConvertedPropertyEntityForTableOfContents {
  return convertPropertyEntityToAnchor(ctx, propertyEntity);
}

export function convertPropertyEntityForDocumentation(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity): ConvertedPropertyEntityForDocumentation {

  const name = propertyEntity.name;
  const symbolId = propertyEntity.symbolId;

  const nameWithContext = renderMemberContext(ctx, "documentation", name);
  const anchor = registerAnchor(ctx, nameWithContext, symbolId);

  const position = convertPositionForDocumentation(ctx, propertyEntity.position);
  const tags = convertTagsForDocumentation(ctx, propertyEntity);
  const type = convertTypeForDocumentation(ctx, propertyEntity.type);

  const description = propertyEntity.description && convertDescriptionForDocumentation(ctx, propertyEntity.description);
  const remarks = propertyEntity.remarks && convertRemarksForDocumentation(ctx, propertyEntity.remarks);
  const example = propertyEntity.example && convertExamplesForDocumentation(ctx, propertyEntity.example);
  const see = propertyEntity.see && convertSeeTagsForDocumentation(ctx, propertyEntity.see);

  return createSectionNode(
    getSectionType(propertyEntity.kind),
    createTitleNode(
      nameWithContext,
      anchor,
      tags,
      position,
      type,
      description,
      remarks,
      example,
      see
    )
  );

}

export function convertPropertyEntityForType(ctx: MarkupRenderContexts, propertyEntity: PropertyEntity): ConvertedPropertyEntityForType {

  const renderConfig = getRenderConfig(ctx);

  const nameWithContext = renderMemberContext(ctx, "documentation", propertyEntity.name);
  const name = encapsulate(nameWithContext, renderConfig.propertyEncapsulation);
  const tags = convertTagsForType(ctx, propertyEntity);
  const description = propertyEntity.description && convertDescriptionForType(ctx, propertyEntity.description);
  const remarks = propertyEntity.remarks && convertRemarksForType(ctx, propertyEntity.remarks);
  const example = propertyEntity.example && convertExamplesForType(ctx, propertyEntity.example);
  const see = propertyEntity.see && convertSeeTagsForType(ctx, propertyEntity.see);

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
    see,
    multilineType
  );

}
