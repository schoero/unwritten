import { renderNode } from "unwritten:renderer/index";
import { convertEntityToAnchor } from "unwritten:renderer/markup/ast-converter/index";
import { getAnchorLink } from "unwritten:renderer/markup/registry/registry";
import { createConditionalNode } from "unwritten:renderer/markup/utils/nodes";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import { isFunctionLikeEntity, isLinkableEntity } from "unwritten:typeguards/entities";

import type { JSDocReference } from "unwritten:interpreter/type-definitions/jsdoc";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup";
import type { ConvertedJSDocReference } from "unwritten:renderer/markup/types-definitions/renderer";


export function convertJSDocReference(ctx: MarkupRenderContexts, jsdocReference: JSDocReference): ConvertedJSDocReference {

  const renderConfig = getRenderConfig(ctx);

  const fallback = encapsulate(jsdocReference.name ?? "", renderConfig.typeEncapsulation);

  if(jsdocReference.target === undefined){
    return fallback;
  }

  // Use the first signature if the target is a function-like entity
  const entity = isFunctionLikeEntity(jsdocReference.target)
    ? jsdocReference.target.signatures[0]
    : jsdocReference.target;

  if(!isLinkableEntity(entity)){
    return fallback;
  }

  const encapsulatedName = encapsulate(jsdocReference.name ?? entity.name, renderConfig.typeEncapsulation);
  const renderedName = renderNode(ctx, encapsulatedName);

  const anchor = convertEntityToAnchor(ctx, entity, renderedName);

  return createConditionalNode(
    getAnchorLink,
    [ctx, anchor.id],
    "!==",
    undefined,
    anchor,
    fallback
  );

}
