import { convertDescription } from "unwritten:renderer/markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer/markup/ast-converter/shared/example.js";
import { convertRemarks } from "unwritten:renderer/markup/ast-converter/shared/remarks.js";
import {
  convertEntityForDocumentation,
  convertEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/index.js";
import { convertJSDocTags } from "unwritten:renderer:markup/ast-converter/shared/jsdoc-tags.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";

import type { NamespaceEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedNamespaceEntityForDocumentation,
  ConvertedNamespaceEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertNamespaceEntityForTableOfContents(ctx: MarkupRenderContexts, namespaceEntity: NamespaceEntity): ConvertedNamespaceEntityForTableOfContents {

  const name = namespaceEntity.name;
  const id = namespaceEntity.symbolId;

  const children = namespaceEntity.exports.map(
    exportedEntity => convertEntityForTableOfContents(ctx, exportedEntity)
  );

  return createTitleNode(
    name,
    id,
    children
  );

}


export function convertNamespaceEntityForDocumentation(ctx: MarkupRenderContexts, namespaceEntity: NamespaceEntity): ConvertedNamespaceEntityForDocumentation {

  const name = namespaceEntity.name;
  const id = namespaceEntity.symbolId;

  const convertedPosition = convertPosition(ctx, namespaceEntity.position);
  const convertedJSDocTags = convertJSDocTags(ctx, namespaceEntity);
  const convertedDescription = convertDescription(ctx, namespaceEntity.description);
  const convertedRemarks = convertRemarks(ctx, namespaceEntity.remarks);
  const convertedExample = convertExample(ctx, namespaceEntity.example);

  const children = namespaceEntity.exports.map(exportedEntity => convertEntityForDocumentation(ctx, exportedEntity));

  return createTitleNode(
    name,
    id,
    convertedPosition,
    convertedJSDocTags,
    convertedDescription,
    convertedRemarks,
    convertedExample,
    ...children
  );

}
