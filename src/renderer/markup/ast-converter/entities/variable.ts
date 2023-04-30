import { convertDescription } from "unwritten:renderer/markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer/markup/ast-converter/shared/example.js";
import { convertRemarks } from "unwritten:renderer/markup/ast-converter/shared/remarks.js";
import { convertTags } from "unwritten:renderer/markup/ast-converter/shared/tags.js";
import { convertTypeInline } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { getAnchorIdentifier } from "unwritten:renderer:markup/utils/linker.js";
import { createLinkNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";

import type { VariableEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedVariableEntityForDocumentation,
  ConvertedVariableEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertVariableEntityForTableOfContents(ctx: MarkupRenderContexts, variable: VariableEntity): ConvertedVariableEntityForTableOfContents {
  const anchorIdentifier = getAnchorIdentifier(ctx, variable.name, variable.symbolId);
  return createLinkNode(variable.name, anchorIdentifier);
}


export function convertVariableEntityForDocumentation(ctx: MarkupRenderContexts, variableEntity: VariableEntity): ConvertedVariableEntityForDocumentation {

  const name = variableEntity.name;

  const convertedTags = convertTags(ctx, variableEntity);
  const convertedPosition = convertPosition(ctx, variableEntity.position);
  const convertedDescription = convertDescription(ctx, variableEntity.description);
  const convertedRemarks = convertRemarks(ctx, variableEntity.remarks);
  const convertedExample = convertExample(ctx, variableEntity.example);
  const convertedType = convertTypeInline(ctx, variableEntity.type);

  return createTitleNode(
    name,
    variableEntity.symbolId,
    convertedPosition,
    convertedTags,
    convertedType,
    convertedDescription,
    convertedRemarks,
    convertedExample
  );

}
