import { convertJSDocNodes } from "unwritten:renderer/markup/ast-converter/shared/jsdoc.js";
import { registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { createInlineTitleNode, createParagraphNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { Remark } from "unwritten:interpreter/type-definitions/jsdoc";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedRemarksForDocumentation,
  ConvertedRemarksForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertRemarksForDocumentation(ctx: MarkupRenderContexts, remarks: Remark): ConvertedRemarksForDocumentation {

  if(remarks.length === 0){
    return;
  }

  const translate = getTranslator(ctx);

  const convertedRemarks = remarks.map(
    remark => createParagraphNode(
      ...convertJSDocNodes(ctx, remark.content)
    )
  );

  const remarksTranslation = translate("remark", { capitalize: true, count: remarks.length });
  const remarksAnchor = registerAnonymousAnchor(ctx, remarksTranslation);

  return createTitleNode(
    remarksTranslation,
    remarksAnchor,
    ...convertedRemarks
  );

}


export function convertRemarksForType(ctx: MarkupRenderContexts, remarks: Remark): ConvertedRemarksForType {

  if(remarks.length === 0){
    return;
  }

  const translate = getTranslator(ctx);

  const convertedRemarks = remarks.map(
    remark => createParagraphNode(
      ...convertJSDocNodes(ctx, remark.content)
    )
  );

  const title = translate("remark", { capitalize: true, count: remarks.length });
  const anchor = registerAnonymousAnchor(ctx, title);

  return createInlineTitleNode(
    title,
    anchor,
    createParagraphNode(
      ...convertedRemarks
    )
  );

}
