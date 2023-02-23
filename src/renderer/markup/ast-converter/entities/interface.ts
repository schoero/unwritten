import { convertSignatureForDocumentation } from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { convertJSDocTags } from "unwritten:renderer/markup/ast-converter/shared/jsdoc-tags.js";
import { convertPosition } from "unwritten:renderer/markup/ast-converter/shared/position.js";
import { getAnchorIdentifier } from "unwritten:renderer/markup/utils/linker.js";
import { createParagraphNode, createSmallNode, createTitleNode } from "unwritten:renderer/markup/utils/nodes.js";
import { renderLink } from "unwritten:renderer:markup/utils/renderer.js";

import type { InterfaceEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type {
  ConvertedInterfaceEntityForDocumentation
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertInterfaceForTableOfContents(ctx: MarkupRenderContexts, interfaceEntity: InterfaceEntity) {
  return renderLink(ctx, interfaceEntity.name, interfaceEntity.id);
}


export function convertInterfaceForDocumentation(ctx: MarkupRenderContexts, interfaceEntity: InterfaceEntity): ConvertedInterfaceEntityForDocumentation {

  const name = interfaceEntity.name;
  const description = interfaceEntity.description ?? "";
  const example = interfaceEntity.example ?? "";
  const remarks = interfaceEntity.remarks ?? "";

  const anchorIdentifier = getAnchorIdentifier(ctx, name, interfaceEntity.id);
  const position = interfaceEntity.position ? convertPosition(ctx, interfaceEntity.position) : "";
  const jsdocTags = convertJSDocTags(ctx, interfaceEntity);

  const renderedCallSignatures = interfaceEntity.callSignatures.map(signatureEntity => convertSignatureForDocumentation(ctx, signatureEntity));
  const renderedConstructSignatures = interfaceEntity.constructSignatures.map(signatureEntity => convertSignatureForDocumentation(ctx, signatureEntity));

  return createTitleNode(
    name,
    interfaceEntity.id,
    [
      createSmallNode(position),
      createParagraphNode(jsdocTags),
      createParagraphNode(description),
      createParagraphNode(remarks),
      createParagraphNode(example),
      renderedConstructSignatures,
      renderedCallSignatures
    ]
  );

}
