import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer";
import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { Type } from "unwritten:interpreter/type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer/markup/types-definitions/markup";
import type { ASTNode } from "unwritten:renderer/markup/types-definitions/nodes";


export function convertTypeArguments(ctx: MarkupRenderContext, typeArguments: Type[]): ASTNode {

  const renderConfig = getRenderConfig(ctx);

  const convertedTypeArguments = typeArguments.map((typeArgument, index) => {
    const { inlineType } = convertType(ctx, typeArgument);
    if(index === 0){
      return inlineType;
    } else {
      return [", ", inlineType];
    }
  }, []);

  return encapsulate(convertedTypeArguments, renderConfig.typeArgumentEncapsulation);

}
