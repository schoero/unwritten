import { convertJSDocNodes } from "unwritten:renderer/markup/ast-converter/shared/jsdoc.js";
import { convertSeeTagsForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/see.js";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { renderMemberContext } from "unwritten:renderer/markup/utils/context.js";
import { spaceBetween } from "unwritten:renderer/markup/utils/renderer.js";
import { convertDescriptionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/description.js";
import { convertExamplesForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/example.js";
import { convertPositionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { convertRemarksForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/remarks.js";
import { convertTagsForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/tags.js";
import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type.js";
import { SECTION_TYPE } from "unwritten:renderer:markup/types-definitions/sections.js";
import {
  createAnchorNode,
  createListNode,
  createSectionNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes.js";

import type {
  EnumEntity,
  EnumMemberEntity,
  MergedEnumEntity
} from "unwritten:interpreter/type-definitions/entities.js";
import type { AnchorNode } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedEnumEntityForDocumentation,
  ConvertedEnumEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertEnumEntityToAnchor(ctx: MarkupRenderContexts, enumEntity: EnumEntity | MergedEnumEntity, displayName?: string): AnchorNode {

  const id = enumEntity.symbolId;
  const name = enumEntity.name;
  const nameWithContext = renderMemberContext(ctx, name);

  return createAnchorNode(
    nameWithContext,
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

  const nameWithContext = renderMemberContext(ctx, name);
  const anchor = registerAnchor(ctx, nameWithContext, symbolId);

  const position = convertPositionForDocumentation(ctx, enumEntity.position);
  const tags = convertTagsForDocumentation(ctx, enumEntity);

  const description = enumEntity.description && convertDescriptionForDocumentation(ctx, enumEntity.description);
  const remarks = enumEntity.remarks && convertRemarksForDocumentation(ctx, enumEntity.remarks);
  const example = enumEntity.example && convertExamplesForDocumentation(ctx, enumEntity.example);
  const see = enumEntity.see && convertSeeTagsForDocumentation(ctx, enumEntity.see);

  const members = enumEntity.members.map(member => convertEnumMember(ctx, member));

  return createSectionNode(
    SECTION_TYPE[enumEntity.kind],
    createTitleNode(
      nameWithContext,
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
