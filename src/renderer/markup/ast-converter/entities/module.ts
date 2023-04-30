import { convertDescription } from "unwritten:renderer/markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer/markup/ast-converter/shared/example.js";
import { convertRemarks } from "unwritten:renderer/markup/ast-converter/shared/remarks.js";
import { convertTags } from "unwritten:renderer/markup/ast-converter/shared/tags.js";
import {
  convertEntityForDocumentation,
  convertEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/index.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";

import type { ModuleEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedModuleEntityForDocumentation,
  ConvertedModuleEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertModuleEntityForTableOfContents(ctx: MarkupRenderContexts, moduleEntity: ModuleEntity): ConvertedModuleEntityForTableOfContents {

  const name = moduleEntity.name;
  const id = moduleEntity.symbolId;

  const children = moduleEntity.exports.map(exportedEntity => convertEntityForTableOfContents(ctx, exportedEntity));

  return createTitleNode(
    name,
    id,
    children
  );

}


export function convertModuleEntityForDocumentation(ctx: MarkupRenderContexts, moduleEntity: ModuleEntity): ConvertedModuleEntityForDocumentation {

  const name = moduleEntity.name;
  const id = moduleEntity.symbolId;

  const convertedPosition = convertPosition(ctx, moduleEntity.position);
  const convertedTags = convertTags(ctx, moduleEntity);
  const convertedDescription = convertDescription(ctx, moduleEntity.description);
  const convertedRemarks = convertRemarks(ctx, moduleEntity.remarks);
  const convertedExample = convertExample(ctx, moduleEntity.example);

  const children = moduleEntity.exports.map(
    exportedEntity => convertEntityForDocumentation(ctx, exportedEntity)
  );

  return createTitleNode(
    name,
    id,
    convertedPosition,
    convertedTags,
    convertedDescription,
    convertedRemarks,
    convertedExample,
    ...children
  );

}