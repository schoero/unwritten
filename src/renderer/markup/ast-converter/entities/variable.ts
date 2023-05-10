import { convertDescription } from "unwritten:renderer/markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer/markup/ast-converter/shared/example.js";
import { convertRemarks } from "unwritten:renderer/markup/ast-converter/shared/remarks.js";
import { convertTags } from "unwritten:renderer/markup/ast-converter/shared/tags.js";
import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { registerAnchor } from "unwritten:renderer/markup/utils/linker.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { createAnchorNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";

import type { VariableEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
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
  const id = variableEntity.symbolId;

  const anchor = registerAnchor(ctx, name, id);

  const convertedTags = convertTags(ctx, variableEntity);
  const convertedPosition = convertPosition(ctx, variableEntity.position);
  const convertedDescription = convertDescription(ctx, variableEntity.description);
  const convertedRemarks = convertRemarks(ctx, variableEntity.remarks);
  const convertedExample = convertExample(ctx, variableEntity.example);
  const convertedType = convertType(ctx, variableEntity.type);

  return createTitleNode(
    name,
    anchor,
    convertedPosition,
    convertedTags,
    convertedType,
    convertedDescription,
    convertedRemarks,
    convertedExample
  );

}
