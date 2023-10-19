import { renderNode } from "unwritten:renderer/index.js";
import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { getAnchorLink } from "unwritten:renderer/markup/registry/registry.js";
import { createAnchorNode, createConditionalNode } from "unwritten:renderer/markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";

import type { JSDocType } from "unwritten:interpreter/type-definitions/jsdoc.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";
import type { ConvertedJSDocType } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertJSDocType(ctx: MarkupRenderContexts, jsdocType: JSDocType): ConvertedJSDocType {

  const renderConfig = getRenderConfig(ctx);

  const name = jsdocType.name ?? "";
  const encapsulatedName = name &&
    encapsulate(name, renderConfig.typeEncapsulation);

  const label = jsdocType.type
    ? convertType(ctx, jsdocType.type).inlineType
    : encapsulatedName;

  const renderedLabel = renderNode(ctx, encapsulatedName);

  if(jsdocType.type?.typeId === undefined){
    return label;
  }

  const anchor = createAnchorNode(renderedLabel, jsdocType.type.typeId);

  return createConditionalNode(
    getAnchorLink,
    [ctx, jsdocType.type.typeId],
    "!==",
    undefined,
    anchor,
    label
  );

}
