import { convertDescriptionForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer/markup/ast-converter/shared/example.js";
import { convertRemarks } from "unwritten:renderer/markup/ast-converter/shared/remarks.js";
import { convertTagsForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/tags.js";
import { convertTypeForType } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { SECTION_TYPE } from "unwritten:renderer/markup/enums/sections.js";
import { registerAnchor } from "unwritten:renderer/markup/utils/linker.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import {
  createAnchorNode,
  createListNode,
  createSectionNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes.js";

import type { EnumEntity, MergedEnumEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedEnumEntityForDocumentation,
  ConvertedEnumEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertEnumEntityForTableOfContents(ctx: MarkupRenderContexts, enumEntity: EnumEntity | MergedEnumEntity): ConvertedEnumEntityForTableOfContents {
  const name = enumEntity.name;
  const id = enumEntity.symbolId;
  return createAnchorNode(name, id);
}


export function convertEnumEntityForDocumentation(ctx: MarkupRenderContexts, enumEntity: EnumEntity | MergedEnumEntity): ConvertedEnumEntityForDocumentation {

  const name = enumEntity.name;
  const id = enumEntity.symbolId;

  const anchor = registerAnchor(ctx, name, id);

  const convertedDescription = convertDescriptionForDocumentation(ctx, enumEntity.description);
  const convertedRemarks = convertRemarks(ctx, enumEntity.remarks);
  const convertedExample = convertExample(ctx, enumEntity.example);
  const convertedPosition = convertPosition(ctx, enumEntity.position);
  const convertedTags = convertTagsForDocumentation(ctx, enumEntity);

  const members = enumEntity.members.map(member => {

    const name = member.name;
    const description = member.description ?? "";
    const type = convertTypeForType(ctx, member.type);

    return [
      name,
      type,
      description
    ];

  });

  return createSectionNode(
    SECTION_TYPE[enumEntity.kind],
    createTitleNode(
      name,
      anchor,
      convertedPosition,
      convertedTags,
      convertedDescription,
      convertedRemarks,
      convertedExample,
      createListNode(...members)
    )
  );

}
