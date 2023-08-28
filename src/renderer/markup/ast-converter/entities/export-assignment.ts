import { registerAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { convertDescriptionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/description.js";
import { convertExamplesForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/example.js";
import { convertPositionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { convertRemarksForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/remarks.js";
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

  const anchor = registerAnchor(ctx, name, symbolId);

  const convertedTags = convertTagsForDocumentation(ctx, exportAssignmentEntity);
  const convertedPosition = convertPositionForDocumentation(ctx, exportAssignmentEntity.position);
  const convertedDescription = convertDescriptionForDocumentation(ctx, exportAssignmentEntity.description);
  const convertedRemarks = convertRemarksForDocumentation(ctx, exportAssignmentEntity.remarks);
  const convertedExample = convertExamplesForDocumentation(ctx, exportAssignmentEntity.example);
  const convertedType = convertTypeForDocumentation(ctx, exportAssignmentEntity.type);

  return createSectionNode(
    SECTION_TYPE[exportAssignmentEntity.kind],
    createTitleNode(
      name,
      anchor,
      convertedTags,
      convertedPosition,
      convertedDescription,
      convertedRemarks,
      convertedExample,
      convertedType
    )
  );

}
