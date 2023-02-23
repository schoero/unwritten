import {
  convertEntityForDocumentation,
  convertEntityForTableOfContents
} from "unwritten:renderer/markup/ast-converter/index.js";
import { createTitleNode } from "unwritten:renderer/markup/utils/nodes.js";

import type { NamespaceEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type {
  ConvertedNamespaceEntityForDocumentation,
  ConvertedNamespaceEntityForTableOfContents
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertNamespaceEntityForTableOfContents(ctx: MarkupRenderContexts, namespaceEntity: NamespaceEntity): ConvertedNamespaceEntityForTableOfContents {

  const name = namespaceEntity.name;
  const id = namespaceEntity.id;

  const children = namespaceEntity.exports.map(exportedEntity => convertEntityForTableOfContents(ctx, exportedEntity));

  return createTitleNode(
    name,
    id,
    children
  );

}


export function convertNamespaceEntityForDocumentation(ctx: MarkupRenderContexts, namespaceEntity: NamespaceEntity): ConvertedNamespaceEntityForDocumentation {

  const name = namespaceEntity.name;
  const id = namespaceEntity.id;

  const children = namespaceEntity.exports.map(exportedEntity => convertEntityForDocumentation(ctx, exportedEntity));

  return createTitleNode(
    name,
    id,
    children
  );

}
