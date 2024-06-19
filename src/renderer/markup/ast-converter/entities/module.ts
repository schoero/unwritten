import { convertSeeTagsForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/see";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry";
import { getSectionType } from "unwritten:renderer/markup/types-definitions/sections.js";
import { renderMemberContext, withMemberContext } from "unwritten:renderer/markup/utils/context";
import { renderEntityPrefix } from "unwritten:renderer/markup/utils/renderer.js";
import { convertEntityForDocumentation, createTableOfContents } from "unwritten:renderer:markup/ast-converter/index";
import { convertDescriptionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/description";
import { convertExamplesForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/example";
import { convertPositionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/position";
import { convertRemarksForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/remarks";
import { convertTagsForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/tags";
import { createAnchorNode, createSectionNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes";

import type { ModuleEntity } from "unwritten:interpreter:type-definitions/entities";
import type { AnchorNode } from "unwritten:renderer/markup/types-definitions/nodes";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedModuleEntityForDocumentation,
  ConvertedModuleEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertModuleEntityToAnchor(ctx: MarkupRenderContext, moduleEntity: ModuleEntity, displayName?: string): AnchorNode {

  const id = moduleEntity.symbolId;
  const name = moduleEntity.name;

  const documentationEntityPrefix = renderEntityPrefix(ctx, "documentation", moduleEntity.kind);
  const documentationName = renderMemberContext(ctx, "documentation", name);

  const tableOfContentsName = renderMemberContext(ctx, "tableOfContents", name);
  const tableOfContentsEntityPrefix = renderEntityPrefix(ctx, "tableOfContents", moduleEntity.kind);

  const prefixedDocumentationName = documentationEntityPrefix
    ? `${documentationEntityPrefix}: ${documentationName}`
    : documentationName;

  const prefixedTableOfContentsName = tableOfContentsEntityPrefix
    ? `${tableOfContentsEntityPrefix}: ${tableOfContentsName}`
    : tableOfContentsName;

  displayName ??= prefixedTableOfContentsName;

  return createAnchorNode(
    prefixedDocumentationName,
    id,
    displayName
  );

}

export function convertModuleEntityForTableOfContents(ctx: MarkupRenderContext, moduleEntity: ModuleEntity): ConvertedModuleEntityForTableOfContents {

  const name = moduleEntity.name;
  const anchor = convertModuleEntityToAnchor(ctx, moduleEntity);

  return withMemberContext(ctx, name, () => {
    const moduleExports = createTableOfContents(ctx, moduleEntity.exports);

    return [
      anchor,
      moduleExports
    ];

  });

}


export function convertModuleEntityForDocumentation(ctx: MarkupRenderContext, moduleEntity: ModuleEntity): ConvertedModuleEntityForDocumentation {

  const name = moduleEntity.name;
  const symbolId = moduleEntity.symbolId;

  const entityPrefix = renderEntityPrefix(ctx, "documentation", moduleEntity.kind);
  const nameWithContext = renderMemberContext(ctx, "documentation", name);

  const prefixedDocumentationName = entityPrefix
    ? `${entityPrefix}: ${nameWithContext}`
    : nameWithContext;

  const anchor = registerAnchor(ctx, prefixedDocumentationName, symbolId);

  return withMemberContext(ctx, name, () => {

    const position = convertPositionForDocumentation(ctx, moduleEntity.position);
    const tags = convertTagsForDocumentation(ctx, moduleEntity);

    const description = moduleEntity.description && convertDescriptionForDocumentation(ctx, moduleEntity.description);
    const remarks = moduleEntity.remarks && convertRemarksForDocumentation(ctx, moduleEntity.remarks);
    const example = moduleEntity.example && convertExamplesForDocumentation(ctx, moduleEntity.example);
    const see = moduleEntity.see && convertSeeTagsForDocumentation(ctx, moduleEntity.see);

    const children = moduleEntity.exports.map(
      exportedEntity => convertEntityForDocumentation(ctx, exportedEntity)
    );

    return createSectionNode(
      getSectionType(moduleEntity.kind),
      createTitleNode(
        prefixedDocumentationName,
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
