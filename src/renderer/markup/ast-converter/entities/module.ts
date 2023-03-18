import {
  convertEntityForDocumentation,
  convertEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/index.js";
import { convertJSDocTags } from "unwritten:renderer:markup/ast-converter/shared/jsdoc-tags.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import {
  createContainerNode,
  createParagraphNode,
  createSmallNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes.js";

import type { ModuleEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedModuleEntityForDocumentation,
  ConvertedModuleEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertModuleEntityForTableOfContents(ctx: MarkupRenderContexts, moduleEntity: ModuleEntity): ConvertedModuleEntityForTableOfContents {

  const name = moduleEntity.name;
  const id = moduleEntity.id;

  const children = moduleEntity.exports.map(exportedEntity => convertEntityForTableOfContents(ctx, exportedEntity));

  return createTitleNode(
    name,
    id,
    children
  );

}


export function convertModuleEntityForDocumentation(ctx: MarkupRenderContexts, moduleEntity: ModuleEntity): ConvertedModuleEntityForDocumentation {

  const name = moduleEntity.name;
  const id = moduleEntity.id;

  const description = moduleEntity.description ?? "";
  const remarks = moduleEntity.remarks ?? "";
  const example = moduleEntity.example ?? "";

  const position = moduleEntity.position ? convertPosition(ctx, moduleEntity.position) : "";
  const jsdocTags = convertJSDocTags(ctx, moduleEntity);

  const children = moduleEntity.exports.map(exportedEntity => convertEntityForDocumentation(ctx, exportedEntity));

  return createTitleNode(
    name,
    id,
    [
      createSmallNode(position),
      createParagraphNode(jsdocTags),
      createParagraphNode(description),
      createParagraphNode(remarks),
      createParagraphNode(example),
      createContainerNode(
        ...children
      )
    ]
  );

}
