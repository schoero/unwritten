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
import { registerAnchor } from "unwritten:renderer:markup/utils/linker.js";
import { createAnchorNode, createSectionNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";

import type { NamespaceEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedNamespaceEntityForDocumentation,
  ConvertedNamespaceEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertNamespaceEntityForTableOfContents(ctx: MarkupRenderContexts, namespaceEntity: NamespaceEntity): ConvertedNamespaceEntityForTableOfContents {

  const name = namespaceEntity.name;
  const id = namespaceEntity.symbolId;

  const anchor = createAnchorNode(
    name,
    id
  );

  const moduleExports = createTableOfContents(ctx, namespaceEntity.exports);

  return [
    anchor,
    moduleExports
  ];

}


export function convertNamespaceEntityForDocumentation(ctx: MarkupRenderContexts, namespaceEntity: NamespaceEntity): ConvertedNamespaceEntityForDocumentation {

  const name = namespaceEntity.name;
  const symbolId = namespaceEntity.symbolId;

  const anchor = registerAnchor(ctx, name, [symbolId]);

  const convertedPosition = convertPosition(ctx, namespaceEntity.position);
  const convertedTags = convertTagsForDocumentation(ctx, namespaceEntity);
  const convertedDescription = convertDescriptionForDocumentation(ctx, namespaceEntity.description);
  const convertedRemarks = convertRemarks(ctx, namespaceEntity.remarks);
  const convertedExample = convertExample(ctx, namespaceEntity.example);

  const children = namespaceEntity.exports.map(exportedEntity => convertEntityForDocumentation(ctx, exportedEntity));

  return createSectionNode(
    SECTION_TYPE[namespaceEntity.kind],
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
