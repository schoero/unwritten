import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer";
import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { Type, UnresolvedType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ASTNode } from "unwritten:renderer:markup/types-definitions/nodes";
import type { ConvertedTypeReferenceTypeInline } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertUnresolvedTypeInline(ctx: MarkupRenderContext, unresolvedType: UnresolvedType): ConvertedTypeReferenceTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = unresolvedType.name;
  const encapsulatedName = name &&
    encapsulate(name, renderConfig.typeEncapsulation);

  const link = name && name in ctx.config.externalTypes &&
    createLinkNode(encapsulatedName, ctx.config.externalTypes[name]!);

  const typeArguments = unresolvedType.typeArguments && unresolvedType.typeArguments.length > 0 &&
    convertTypeArguments(ctx, unresolvedType.typeArguments);

  return spaceBetween(
    link || encapsulatedName,
    typeArguments
  );

}


function convertTypeArguments(ctx: MarkupRenderContext, typeArguments: Type[]): ASTNode {

  const renderConfig = getRenderConfig(ctx);

  const convertedTypeArguments = typeArguments.map((typeArgument, index) => {
    const { inlineType } = convertType(ctx, typeArgument);
    if(index === 0){
      return inlineType;
    } else {
      return [", ", inlineType];
    }
  }, []);

  return encapsulate(convertedTypeArguments, renderConfig.typeParameterEncapsulation);

}
