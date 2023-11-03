import { convertSeeTagsForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/see";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry";
import { renderMemberContext } from "unwritten:renderer/markup/utils/context";
import { convertDescriptionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/description";
import { convertExamplesForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/example";
import { convertPositionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/position";
import { convertRemarksForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/remarks";
import { convertTagsForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/tags";
import { convertTypeForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/type";
import { getSectionType } from "unwritten:renderer:markup/types-definitions/sections";
import { createAnchorNode, createSectionNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes";

import type { VariableEntity } from "unwritten:interpreter/type-definitions/entities";
import type { AnchorNode } from "unwritten:renderer/markup/types-definitions/nodes";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedVariableEntityForDocumentation,
  ConvertedVariableEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertVariableEntityToAnchor(ctx: MarkupRenderContexts, variableEntity: VariableEntity, displayName?: string): AnchorNode {

  const id = variableEntity.symbolId;
  const name = variableEntity.name;
  const documentationName = renderMemberContext(ctx, "documentation", name);
  const tableOfContentsName = renderMemberContext(ctx, "tableOfContents", name);

  displayName ??= tableOfContentsName;

  return createAnchorNode(
    documentationName,
    id,
    displayName
  );

}

export function convertVariableEntityForTableOfContents(ctx: MarkupRenderContexts, variableEntity: VariableEntity): ConvertedVariableEntityForTableOfContents {
  return convertVariableEntityToAnchor(ctx, variableEntity);
}

export function convertVariableEntityForDocumentation(ctx: MarkupRenderContexts, variableEntity: VariableEntity): ConvertedVariableEntityForDocumentation {

  const name = variableEntity.name;
  const symbolId = variableEntity.symbolId;

  const nameWithContext = renderMemberContext(ctx, "documentation", name);
  const anchor = registerAnchor(ctx, nameWithContext, symbolId);

  const tags = convertTagsForDocumentation(ctx, variableEntity);
  const position = convertPositionForDocumentation(ctx, variableEntity.position);
  const type = convertTypeForDocumentation(ctx, variableEntity.type);

  const description = variableEntity.description && convertDescriptionForDocumentation(ctx, variableEntity.description);
  const remarks = variableEntity.remarks && convertRemarksForDocumentation(ctx, variableEntity.remarks);
  const example = variableEntity.example && convertExamplesForDocumentation(ctx, variableEntity.example);
  const see = variableEntity.see && convertSeeTagsForDocumentation(ctx, variableEntity.see);

  return createSectionNode(
    getSectionType(variableEntity.kind),
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
