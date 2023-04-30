import { convertDescription } from "unwritten:renderer/markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer/markup/ast-converter/shared/example.js";
import { convertRemarks } from "unwritten:renderer/markup/ast-converter/shared/remarks.js";
import { convertTags } from "unwritten:renderer/markup/ast-converter/shared/tags.js";
import { convertTypeInline } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { createLinkNode, createListNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";

import type { EnumEntity, MergedEnumEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedEnumEntityForDocumentation,
  ConvertedEnumEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertEnumEntityForTableOfContents(ctx: MarkupRenderContexts, enumEntity: EnumEntity | MergedEnumEntity): ConvertedEnumEntityForTableOfContents {
  return createLinkNode(enumEntity.name, enumEntity.symbolId);
}


export function convertEnumEntityForDocumentation(ctx: MarkupRenderContexts, enumEntity: EnumEntity | MergedEnumEntity): ConvertedEnumEntityForDocumentation {

  const name = enumEntity.name;

  const convertedDescription = convertDescription(ctx, enumEntity.description);
  const convertedRemarks = convertRemarks(ctx, enumEntity.remarks);
  const convertedExample = convertExample(ctx, enumEntity.example);
  const convertedPosition = convertPosition(ctx, enumEntity.position);
  const convertedTags = convertTags(ctx, enumEntity);

  const members = enumEntity.members.map(member => {

    const name = member.name;
    const description = member.description ?? "";
    const type = convertTypeInline(ctx, member.type);

    return [
      name,
      type,
      description
    ];

  });

  return createTitleNode(
    name,
    enumEntity.symbolId,
    convertedPosition,
    convertedTags,
    convertedDescription,
    convertedRemarks,
    convertedExample,
    createListNode(...members)
  );

}