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
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedVariableEntityForDocumentation,
  ConvertedVariableEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertVariableEntityForTableOfContents(ctx: MarkupRenderContexts, variableEntity: VariableEntity): ConvertedVariableEntityForTableOfContents {
  const name = variableEntity.name;
  const id = variableEntity.symbolId;
  return createAnchorNode(name, id);
}


export function convertVariableEntityForDocumentation(ctx: MarkupRenderContexts, variableEntity: VariableEntity): ConvertedVariableEntityForDocumentation {

  const name = variableEntity.name;
  const symbolId = variableEntity.symbolId;

  const anchor = registerAnchor(ctx, name, symbolId);

  const convertedTags = convertTagsForDocumentation(ctx, variableEntity);
  const convertedPosition = convertPositionForDocumentation(ctx, variableEntity.position);
  const convertedDescription = convertDescriptionForDocumentation(ctx, variableEntity.description);
  const convertedRemarks = convertRemarksForDocumentation(ctx, variableEntity.remarks);
  const convertedExample = convertExamplesForDocumentation(ctx, variableEntity.example);
  const convertedType = convertTypeForDocumentation(ctx, variableEntity.type);

  return createSectionNode(
    SECTION_TYPE[variableEntity.kind],
    createTitleNode(
      name,
      anchor,
      convertedTags,
      convertedPosition,
      convertedType,
      convertedDescription,
      convertedRemarks,
      convertedExample
    )
  );

}
