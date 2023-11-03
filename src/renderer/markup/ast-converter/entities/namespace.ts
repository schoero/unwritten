import { convertSeeTagsForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/see";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry";
import { getSectionType } from "unwritten:renderer/markup/types-definitions/sections.js";
import { renderMemberContext, withMemberContext } from "unwritten:renderer/markup/utils/context";
import { convertEntityForDocumentation, createTableOfContents } from "unwritten:renderer:markup/ast-converter/index";
import { convertDescriptionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/description";
import { convertExamplesForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/example";
import { convertPositionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/position";
import { convertRemarksForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/remarks";
import { convertTagsForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/tags";
import { createAnchorNode, createSectionNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes";

import type { NamespaceEntity } from "unwritten:interpreter/type-definitions/entities";
import type { AnchorNode } from "unwritten:renderer/markup/types-definitions/nodes";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedNamespaceEntityForDocumentation,
  ConvertedNamespaceEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertNamespaceEntityToAnchor(ctx: MarkupRenderContexts, namespaceEntity: NamespaceEntity, displayName?: string): AnchorNode {

  const id = namespaceEntity.symbolId;
  const name = namespaceEntity.name;
  const documentationName = renderMemberContext(ctx, "documentation", name);
  const tableOfContentsName = renderMemberContext(ctx, "tableOfContents", name);

  displayName ??= tableOfContentsName;

  return createAnchorNode(
    documentationName,
    id,
    displayName
  );

}

export function convertNamespaceEntityForTableOfContents(ctx: MarkupRenderContexts, namespaceEntity: NamespaceEntity): ConvertedNamespaceEntityForTableOfContents {

  const name = namespaceEntity.name;
  const anchor = convertNamespaceEntityToAnchor(ctx, namespaceEntity);

  return withMemberContext(ctx, name, () => {

    const moduleExports = createTableOfContents(ctx, namespaceEntity.exports);

    return [
      anchor,
      moduleExports
    ];

  });

}

export function convertNamespaceEntityForDocumentation(ctx: MarkupRenderContexts, namespaceEntity: NamespaceEntity): ConvertedNamespaceEntityForDocumentation {

  const name = namespaceEntity.name;
  const symbolId = namespaceEntity.symbolId;

  const nameWithContext = renderMemberContext(ctx, "documentation", name);
  const anchor = registerAnchor(ctx, nameWithContext, symbolId);

  return withMemberContext(ctx, name, () => {

    const position = convertPositionForDocumentation(ctx, namespaceEntity.position);
    const tags = convertTagsForDocumentation(ctx, namespaceEntity);

    const description = namespaceEntity.description && convertDescriptionForDocumentation(ctx, namespaceEntity.description);
    const remarks = namespaceEntity.remarks && convertRemarksForDocumentation(ctx, namespaceEntity.remarks);
    const example = namespaceEntity.example && convertExamplesForDocumentation(ctx, namespaceEntity.example);
    const see = namespaceEntity.see && convertSeeTagsForDocumentation(ctx, namespaceEntity.see);

    const children = namespaceEntity.exports.map(exportedEntity => convertEntityForDocumentation(ctx, exportedEntity));

    return createSectionNode(
      getSectionType(namespaceEntity.kind),
      createTitleNode(
        nameWithContext,
        anchor,
        tags,
        position,
        description,
        remarks,
        example,
        see,
        ...children
      )
    );

  });

}
