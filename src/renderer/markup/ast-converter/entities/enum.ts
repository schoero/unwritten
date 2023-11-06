import { convertJSDocNodes } from "unwritten:renderer/markup/ast-converter/shared/jsdoc";
import { convertSeeTagsForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/see";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry";
import { renderMemberContext } from "unwritten:renderer/markup/utils/context";
import { renderEntityPrefix, spaceBetween } from "unwritten:renderer/markup/utils/renderer";
import { convertDescriptionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/description";
import { convertExamplesForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/example";
import { convertPositionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/position";
import { convertRemarksForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/remarks";
import { convertTagsForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/tags";
import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type";
import { getSectionType } from "unwritten:renderer:markup/types-definitions/sections";
import {
  createAnchorNode,
  createListNode,
  createSectionNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes";

import type { EnumEntity, EnumMemberEntity, MergedEnumEntity } from "unwritten:interpreter/type-definitions/entities";
import type { AnchorNode } from "unwritten:renderer/markup/types-definitions/nodes";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedEnumEntityForDocumentation,
  ConvertedEnumEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertEnumEntityToAnchor(ctx: MarkupRenderContexts, enumEntity: EnumEntity | MergedEnumEntity, displayName?: string): AnchorNode {

  const id = enumEntity.symbolId;
  const name = enumEntity.name;

  const documentationEntityPrefix = renderEntityPrefix(ctx, "documentation", enumEntity.kind);
  const documentationName = renderMemberContext(ctx, "documentation", name);

  const tableOfContentsName = renderMemberContext(ctx, "tableOfContents", name);
  const tableOfContentsEntityPrefix = renderEntityPrefix(ctx, "tableOfContents", enumEntity.kind);

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


export function convertEnumEntityForTableOfContents(ctx: MarkupRenderContexts, enumEntity: EnumEntity | MergedEnumEntity): ConvertedEnumEntityForTableOfContents {
  return convertEnumEntityToAnchor(ctx, enumEntity);
}


export function convertEnumEntityForDocumentation(ctx: MarkupRenderContexts, enumEntity: EnumEntity | MergedEnumEntity): ConvertedEnumEntityForDocumentation {

  const name = enumEntity.name;
  const symbolId = enumEntity.symbolId;

  const entityPrefix = renderEntityPrefix(ctx, "documentation", enumEntity.kind);
  const nameWithContext = renderMemberContext(ctx, "documentation", name);

  const prefixedDocumentationName = entityPrefix
    ? `${entityPrefix}: ${nameWithContext}`
    : nameWithContext;

  const anchor = registerAnchor(ctx, prefixedDocumentationName, symbolId);

  const position = convertPositionForDocumentation(ctx, enumEntity.position);
  const tags = convertTagsForDocumentation(ctx, enumEntity);

  const description = enumEntity.description && convertDescriptionForDocumentation(ctx, enumEntity.description);
  const remarks = enumEntity.remarks && convertRemarksForDocumentation(ctx, enumEntity.remarks);
  const example = enumEntity.example && convertExamplesForDocumentation(ctx, enumEntity.example);
  const see = enumEntity.see && convertSeeTagsForDocumentation(ctx, enumEntity.see);

  const members = enumEntity.members.map(member => convertEnumMember(ctx, member));

  return createSectionNode(
    getSectionType(enumEntity.kind),
    createTitleNode(
      prefixedDocumentationName,
      anchor,
      tags,
      position,
      description,
      remarks,
      example,
      see,
      createListNode(...members)
    )
  );

}

function convertEnumMember(ctx: MarkupRenderContexts, member: EnumMemberEntity) {

  const name = member.name;

  const description = member.description
    ? convertJSDocNodes(ctx, member.description)
    : [];

  const { inlineType: type } = convertType(ctx, member.type);

  return spaceBetween(
    name,
    type,
    ...description
  );

}
