import { convertSeeTagsForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/see.js";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { convertDescriptionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/description.js";
import { convertExamplesForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/example.js";
import { convertPositionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { convertRemarksForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/remarks.js";
import { convertTagsForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/tags.js";
import { convertTypeForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/type.js";
import { SECTION_TYPE } from "unwritten:renderer:markup/types-definitions/sections.js";
import { createAnchorNode, createSectionNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";

import type { VariableEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { AnchorNode } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedVariableEntityForDocumentation,
  ConvertedVariableEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertVariableEntityToAnchor(ctx: MarkupRenderContexts, variableEntity: VariableEntity, displayName?: string): AnchorNode {

  const name = variableEntity.name;
  const id = variableEntity.symbolId;

  return createAnchorNode(
    name,
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

  const anchor = registerAnchor(ctx, name, symbolId);

  const tags = convertTagsForDocumentation(ctx, variableEntity);
  const position = convertPositionForDocumentation(ctx, variableEntity.position);
  const type = convertTypeForDocumentation(ctx, variableEntity.type);

  const description = variableEntity.description && convertDescriptionForDocumentation(ctx, variableEntity.description);
  const remarks = variableEntity.remarks && convertRemarksForDocumentation(ctx, variableEntity.remarks);
  const example = variableEntity.example && convertExamplesForDocumentation(ctx, variableEntity.example);
  const see = variableEntity.see && convertSeeTagsForDocumentation(ctx, variableEntity.see);

  return createSectionNode(
    SECTION_TYPE[variableEntity.kind],
    createTitleNode(
      name,
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
