import { createInlineTitleNode, createParagraphNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { Remarks } from "unwritten:interpreter:type-definitions/shared.js";
import type { ASTNode, ParagraphNode } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedRemarksForDocumentation,
  ConvertedRemarksForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertRemarksForDocumentation(ctx: MarkupRenderContexts, remarks: Remarks): ConvertedRemarksForDocumentation {

  if(!remarks){
    return "";
  }

  const translate = getTranslator(ctx);

  const convertedRemarks = remarks.flat().map(remark => {
    if(!remark){
      return;
    }
    return createParagraphNode(remark);
  })
    .filter(node => !!node) as ParagraphNode[];

  return createTitleNode(
    translate("remark", { capitalize: true, count: remarks.length }),
    ...convertedRemarks
  );

}


export function convertRemarksForType(ctx: MarkupRenderContexts, remarks: Remarks): ConvertedRemarksForType {

  if(!remarks){
    return "";
  }

  const translate = getTranslator(ctx);

  const title = translate("remark", { capitalize: true, count: remarks.length });

  const convertedRemarks = remarks.flat().map(remark => {
    if(!remark){
      return;
    }
    return remark;
  })
    .filter(node => !!node) as ASTNode[];

  return createInlineTitleNode(
    title,
    createParagraphNode(
      ...convertedRemarks
    )
  );

}
