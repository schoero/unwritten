import {
  convertSignatureForDocumentation,
  convertSignatureForTableOfContents
} from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { convertJSDocTags } from "unwritten:renderer/markup/ast-converter/shared/jsdoc-tags.js";
import { convertPosition } from "unwritten:renderer/markup/ast-converter/shared/position.js";
import { getAnchorIdentifier } from "unwritten:renderer/markup/utils/linker.js";
import { createListNode, createSmallNode, createTitleNode } from "unwritten:renderer/markup/utils/nodes.js";
import { renderLink } from "unwritten:renderer:markup/utils/renderer.js";

import type { InterfaceEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type {
  ConvertedInterfaceEntityForDocumentation
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertInterfaceForTableOfContents(ctx: MarkupRenderContexts, iface: InterfaceEntity) {
  return renderLink(ctx, iface.name, iface.id);
}


export function convertInterfaceForDocumentation(ctx: MarkupRenderContexts, iface: InterfaceEntity): ConvertedInterfaceEntityForDocumentation {

  const name = iface.name;
  const description = iface.description ?? "";
  const example = iface.example ?? "";
  const remarks = iface.remarks ?? "";

  const anchorIdentifier = getAnchorIdentifier(ctx, name, iface.id);
  const position = iface.position ? convertPosition(ctx, iface.position) : "";
  const jsdocTags = convertJSDocTags(ctx, iface);

  const renderedCallSignatureTitles = iface.callSignatures.map(signatureEntity => convertSignatureForTableOfContents(ctx, signatureEntity));
  const renderedConstructSignatureTitles = iface.constructSignatures.map(signatureEntity => convertSignatureForTableOfContents(ctx, signatureEntity));

  const renderedCallSignatures = iface.callSignatures.map(signatureEntity => convertSignatureForDocumentation(ctx, signatureEntity));
  const renderedConstructSignatures = iface.constructSignatures.map(signatureEntity => convertSignatureForDocumentation(ctx, signatureEntity));

  return createTitleNode(
    name,
    anchorIdentifier,
    [
      createSmallNode(position),
      createSmallNode(jsdocTags),
      createListNode(
        render
      )
    ]
  );

}
