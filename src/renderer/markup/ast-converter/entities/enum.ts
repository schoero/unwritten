import { convertType } from "unwritten:renderer/markup/ast-converter/index.js";
import { convertJSDocTags } from "unwritten:renderer/markup/ast-converter/shared/jsdoc-tags.js";
import { convertPosition } from "unwritten:renderer/markup/ast-converter/shared/position.js";
import {
  createLinkNode,
  createListNode,
  createParagraphNode,
  createSmallNode,
  createTitleNode
} from "unwritten:renderer/markup/utils/nodes.js";

import type { EnumEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type {
  ConvertedEnumEntityForDocumentation,
  ConvertedEnumEntityForTableOfContents
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertEnumEntityForTableOfContents(ctx: MarkupRenderContexts, enumEntity: EnumEntity): ConvertedEnumEntityForTableOfContents {
  return createLinkNode(enumEntity.name, enumEntity.id);
}


export function convertEnumEntityForDocumentation(ctx: MarkupRenderContexts, enumEntity: EnumEntity): ConvertedEnumEntityForDocumentation {

  const name = enumEntity.name;
  const description = enumEntity.description ?? "";
  const example = enumEntity.example ?? "";
  const remarks = enumEntity.remarks ?? "";

  const position = enumEntity.position ? convertPosition(ctx, enumEntity.position) : "";
  const jsdocTags = convertJSDocTags(ctx, enumEntity);

  const members = enumEntity.members.map(member => {

    const name = member.name;
    const description = member.description ?? "";
    const type = convertType(ctx, member.type);

    return [
      name,
      type,
      description
    ];

  });

  return createTitleNode(
    name,
    enumEntity.id,
    [
      createSmallNode(position),
      createParagraphNode(jsdocTags),
      createParagraphNode(description),
      createParagraphNode(remarks),
      createParagraphNode(example),
      createListNode(...members)
    ]
  );

}
