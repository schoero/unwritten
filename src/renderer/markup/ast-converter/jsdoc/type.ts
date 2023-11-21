import { renderNode } from "unwritten:renderer/index";
import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type";
import { getAnchorLink } from "unwritten:renderer/markup/registry/registry";
import { createAnchorNode, createConditionalNode } from "unwritten:renderer/markup/utils/nodes";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer";
import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { JSDocType } from "unwritten:interpreter/type-definitions/jsdoc";
import type { MarkupRenderContext } from "unwritten:renderer/markup/types-definitions/markup";
import type { ConvertedJSDocType } from "unwritten:renderer/markup/types-definitions/renderer";


export function convertJSDocType(ctx: MarkupRenderContext, jsdocType: JSDocType): ConvertedJSDocType {

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
