import { convertType } from "unwritten:renderer:markup/ast-converter/index.js";
import { convertJSDocTags } from "unwritten:renderer:markup/ast-converter/shared/jsdoc-tags.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { getAnchorIdentifier } from "unwritten:renderer:markup/utils/linker.js";
import {
  createLinkNode,
  createParagraphNode,
  createSmallNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { VariableEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedVariableEntityForDocumentation,
  ConvertedVariableEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertVariableEntityForTableOfContents(ctx: MarkupRenderContexts, variable: VariableEntity): ConvertedVariableEntityForTableOfContents {
  const anchorIdentifier = getAnchorIdentifier(ctx, variable.name, variable.id);
  return createLinkNode(variable.name, anchorIdentifier);
}


export function convertVariableEntityForDocumentation(ctx: MarkupRenderContexts, variableEntity: VariableEntity): ConvertedVariableEntityForDocumentation {

  const translate = getTranslator(ctx);

  const name = variableEntity.name;
  const description = variableEntity.description ?? "";
  const example = variableEntity.example ?? "";
  const remarks = variableEntity.remarks ?? "";

  const position = variableEntity.position ? convertPosition(ctx, variableEntity.position) : "";
  const jsdocTags = convertJSDocTags(ctx, variableEntity);

  const type = [`${translate("type", { capitalize: true, count: 1 })}: `, convertType(ctx, variableEntity.type)];

  return createTitleNode(
    name,
    variableEntity.id,
    [
      createSmallNode(position),
      createParagraphNode(jsdocTags),
      createParagraphNode(type),
      createParagraphNode(description),
      createParagraphNode(example),
      createParagraphNode(remarks)
    ]
  );

}
