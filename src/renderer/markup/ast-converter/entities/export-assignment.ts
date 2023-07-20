import { registerAnchor } from "unwritten:renderer/markup/source-registry/link-registry.js";
import { convertDescriptionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer:markup/ast-converter/shared/example.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { convertRemarks } from "unwritten:renderer:markup/ast-converter/shared/remarks.js";
import { convertTagsForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/tags.js";
import { convertTypeForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/type.js";
import { SECTION_TYPE } from "unwritten:renderer:markup/types-definitions/sections.js";
import { createAnchorNode, createSectionNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";

import type { ExportAssignmentEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedExportAssignmentEntityForDocumentation,
  ConvertedExportAssignmentEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertExportAssignmentEntityForTableOfContents(ctx: MarkupRenderContexts, exportAssignmentEntity: ExportAssignmentEntity): ConvertedExportAssignmentEntityForTableOfContents {
  const name = exportAssignmentEntity.name;
  const id = exportAssignmentEntity.symbolId;
  return createAnchorNode(name, id);
}


export function convertExportAssignmentEntityForDocumentation(ctx: MarkupRenderContexts, exportAssignmentEntity: ExportAssignmentEntity): ConvertedExportAssignmentEntityForDocumentation {

  const name = exportAssignmentEntity.name;
  const symbolId = exportAssignmentEntity.symbolId;

  const anchor = registerAnchor(ctx, name, [symbolId]);

  const convertedTags = convertTagsForDocumentation(ctx, exportAssignmentEntity);
  const convertedPosition = convertPosition(ctx, exportAssignmentEntity.position);
  const convertedDescription = convertDescriptionForDocumentation(ctx, exportAssignmentEntity.description);
  const convertedRemarks = convertRemarks(ctx, exportAssignmentEntity.remarks);
  const convertedExample = convertExample(ctx, exportAssignmentEntity.example);
  const convertedType = convertTypeForDocumentation(ctx, exportAssignmentEntity.type);

  return createSectionNode(
    SECTION_TYPE[exportAssignmentEntity.kind],
    createTitleNode(
      name,
      anchor,
      convertedPosition,
      convertedTags,
      convertedDescription,
      convertedRemarks,
      convertedExample,
      convertedType
    )
  );

}
