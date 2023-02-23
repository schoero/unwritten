import { convertType } from "unwritten:renderer/markup/ast-converter/index.js";
import { convertJSDocTags } from "unwritten:renderer/markup/ast-converter/shared/jsdoc-tags.js";
import { convertPosition } from "unwritten:renderer/markup/ast-converter/shared/position.js";
import { getAnchorIdentifier } from "unwritten:renderer/markup/utils/linker.js";
import {
  createLinkNode,
  createParagraphNode,
  createSmallNode,
  createTitleNode
} from "unwritten:renderer/markup/utils/nodes.js";

import type { VariableEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type {
  ConvertedVariableEntityForDocumentation,
  ConvertedVariableEntityForTableOfContents
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertVariableForTableOfContents(ctx: MarkupRenderContexts, variable: VariableEntity): ConvertedVariableEntityForTableOfContents {
  const anchorIdentifier = getAnchorIdentifier(ctx, variable.name, variable.id);
  return createLinkNode(variable.name, anchorIdentifier);
}


export function convertVariableForDocumentation(ctx: MarkupRenderContexts, variableEntity: VariableEntity): ConvertedVariableEntityForDocumentation {

  const name = variableEntity.name;
  const description = variableEntity.description ?? "";
  const example = variableEntity.example ?? "";
  const remarks = variableEntity.remarks ?? "";

  const anchorId = getAnchorIdentifier(ctx, name, variableEntity.id);
  const position = variableEntity.position ? convertPosition(ctx, variableEntity.position) : "";
  const jsdocTags = convertJSDocTags(ctx, variableEntity);

  const type = ["Type: ", convertType(ctx, variableEntity.type)];

  return createTitleNode(
    name,
    variableEntity.id,
    [
      createSmallNode(jsdocTags),
      createParagraphNode(position),
      createParagraphNode(type),
      createParagraphNode(description),
      createParagraphNode(example),
      createParagraphNode(remarks)
    ]
  );

}
