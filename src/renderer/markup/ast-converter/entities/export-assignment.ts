import { convertSeeTagsForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/see";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry";
import { renderMemberContext } from "unwritten:renderer/markup/utils/context";
import { convertDescriptionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/description";
import { convertExamplesForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/example";
import { convertPositionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/position";
import { convertRemarksForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/remarks";
import { convertTagsForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/tags";
import { convertTypeForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/type";
import { SECTION_TYPE } from "unwritten:renderer:markup/types-definitions/sections";
import { createAnchorNode, createSectionNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes";

import type { ExportAssignmentEntity } from "unwritten:interpreter/type-definitions/entities";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedExportAssignmentEntityForDocumentation,
  ConvertedExportAssignmentEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertExportAssignmentEntityToAnchor(ctx: MarkupRenderContexts, exportAssignmentEntity: ExportAssignmentEntity, displayName?: string): ConvertedExportAssignmentEntityForTableOfContents {

  const id = exportAssignmentEntity.symbolId;
  const name = exportAssignmentEntity.name;
  const documentationName = renderMemberContext(ctx, "documentation", name);
  const tableOfContentsName = renderMemberContext(ctx, "tableOfContents", name);

  displayName ??= tableOfContentsName;

  return createAnchorNode(
    documentationName,
    id,
    displayName
  );

}

export function convertExportAssignmentEntityForTableOfContents(ctx: MarkupRenderContexts, exportAssignmentEntity: ExportAssignmentEntity): ConvertedExportAssignmentEntityForTableOfContents {
  return convertExportAssignmentEntityToAnchor(ctx, exportAssignmentEntity);
}

export function convertExportAssignmentEntityForDocumentation(ctx: MarkupRenderContexts, exportAssignmentEntity: ExportAssignmentEntity): ConvertedExportAssignmentEntityForDocumentation {

  const name = exportAssignmentEntity.name;
  const symbolId = exportAssignmentEntity.symbolId;

  const nameWithContext = renderMemberContext(ctx, "documentation", name);
  const anchor = registerAnchor(ctx, nameWithContext, symbolId);

  const tags = convertTagsForDocumentation(ctx, exportAssignmentEntity);
  const position = convertPositionForDocumentation(ctx, exportAssignmentEntity.position);
  const type = convertTypeForDocumentation(ctx, exportAssignmentEntity.type);

  const description = exportAssignmentEntity.description && convertDescriptionForDocumentation(ctx, exportAssignmentEntity.description);
  const remarks = exportAssignmentEntity.remarks && convertRemarksForDocumentation(ctx, exportAssignmentEntity.remarks);
  const example = exportAssignmentEntity.example && convertExamplesForDocumentation(ctx, exportAssignmentEntity.example);
  const see = exportAssignmentEntity.see && convertSeeTagsForDocumentation(ctx, exportAssignmentEntity.see);

  return createSectionNode(
    SECTION_TYPE[exportAssignmentEntity.kind],
    createTitleNode(
      nameWithContext,
      anchor,
      tags,
      position,
      description,
      remarks,
      example,
      see,
      type
    )
  );

}
