import { registerAnchor } from "unwritten:renderer/markup/registry/registry.js";
import {
  convertEntityForDocumentation,
  createTableOfContents
} from "unwritten:renderer:markup/ast-converter/index.js";
import { convertDescriptionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer:markup/ast-converter/shared/example.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { convertRemarks } from "unwritten:renderer:markup/ast-converter/shared/remarks.js";
import { convertTagsForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/tags.js";
import { SECTION_TYPE } from "unwritten:renderer:markup/types-definitions/sections.js";
import { createAnchorNode, createSectionNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";

import type { ModuleEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedModuleEntityForDocumentation,
  ConvertedModuleEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertModuleEntityForTableOfContents(ctx: MarkupRenderContexts, moduleEntity: ModuleEntity): ConvertedModuleEntityForTableOfContents {

  const name = moduleEntity.name;
  const id = moduleEntity.symbolId;

  const anchor = createAnchorNode(
    name,
    id
  );

  const moduleExports = createTableOfContents(ctx, moduleEntity.exports);

  return [
    anchor,
    moduleExports
  ];

}


export function convertModuleEntityForDocumentation(ctx: MarkupRenderContexts, moduleEntity: ModuleEntity): ConvertedModuleEntityForDocumentation {

  const name = moduleEntity.name;
  const symbolId = moduleEntity.symbolId;

  const anchor = registerAnchor(ctx, name, symbolId);

  const convertedPosition = convertPosition(ctx, moduleEntity.position);
  const convertedTags = convertTagsForDocumentation(ctx, moduleEntity);
  const convertedDescription = convertDescriptionForDocumentation(ctx, moduleEntity.description);
  const convertedRemarks = convertRemarks(ctx, moduleEntity.remarks);
  const convertedExample = convertExample(ctx, moduleEntity.example);

  const children = moduleEntity.exports.map(
    exportedEntity => convertEntityForDocumentation(ctx, exportedEntity)
  );

  return createSectionNode(
    SECTION_TYPE[moduleEntity.kind],
    createTitleNode(
      name,
      anchor,
      convertedPosition,
      convertedTags,
      convertedDescription,
      convertedRemarks,
      convertedExample,
      ...children
    )
  );

}
