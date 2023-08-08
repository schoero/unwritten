import { isSymbolExported } from "unwritten:renderer/markup/registry/registry.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type.js";
import { createAnchorNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";
import { assert } from "unwritten:utils/general.js";

import type { ID } from "unwritten:interpreter/type-definitions/shared.js";
import type { Type, TypeReferenceType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNodes } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type {
  ConvertedMultilineTypes,
  ConvertedTypeReferenceTypeInline
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertTypeReferenceTypeInline(ctx: MarkupRenderContexts, typeReferenceType: TypeReferenceType): ConvertedTypeReferenceTypeInline {

  const name = typeReferenceType.name ?? "";

  if(hasExportedTarget(ctx, typeReferenceType)){
    return convertTarget(ctx, typeReferenceType);
  }

  if(typeReferenceType.type){
    return convertType(ctx, typeReferenceType.type).inlineType;
  }

  return name;

}


export function convertTypeReferenceTypeMultiline(ctx: MarkupRenderContexts, typeReferenceType: TypeReferenceType): ConvertedMultilineTypes | undefined {

  if(hasExportedTarget(ctx, typeReferenceType)){
    return;
  }

  if(typeReferenceType.type !== undefined){
    return convertType(ctx, typeReferenceType.type).multilineType;
  }

}


function convertTypeArguments(ctx: MarkupRenderContexts, typeArguments: Type[]): ASTNodes {

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

function convertTarget(ctx: MarkupRenderContexts, typeReferenceType: TypeReferenceType): ASTNodes {

  assert(hasExportedTarget(ctx, typeReferenceType));

  const name = typeReferenceType.name ?? "";
  const anchor = createAnchorNode(name, typeReferenceType.symbolId);
  const typeArguments = typeReferenceType.typeArguments && typeReferenceType.typeArguments.length > 0
    ? convertTypeArguments(ctx, typeReferenceType.typeArguments)
    : "";

  return spaceBetween(
    anchor,
    typeArguments
  );

}

function hasExportedTarget(ctx: MarkupRenderContexts, typeReferenceType: TypeReferenceType): typeReferenceType is TypeReferenceType & { symbolId: ID; } {
  return typeReferenceType.symbolId !== undefined &&
    isSymbolExported(ctx, typeReferenceType.symbolId);
}
