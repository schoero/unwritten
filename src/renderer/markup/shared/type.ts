import {
  isInstanceType,
  isIntersectionType,
  isLiteralType,
  isPrimitiveType,
  isUnionType
} from "../../../typeguards/types.js";
import { RenderContext } from "../../../types/context.js";
import { Type, TypeKind } from "../../../types/types.js";
import { MarkupRenderer } from "../types/renderer.js";
import { getRenderConfig } from "../utils/config.js";
import { encapsulate } from "../utils/renderer.js";
import { renderInstanceType } from "./instance.js";
import { renderIntersectionType } from "./intersection.js";
import { renderLiteralType } from "./literal.js";
import { renderPrimitiveType } from "./primitive.js";
import { renderUnionType } from "./union.js";


export function renderType(ctx: RenderContext<MarkupRenderer>, type: Type<TypeKind>, enableEncapsulation: boolean = true): string {

  let renderedType: string | undefined;

  if(isLiteralType(type)){
    renderedType = renderLiteralType(ctx, type);
  } else if(isPrimitiveType(type)){
    renderedType = renderPrimitiveType(ctx, type);
  } else if(isUnionType(type)){
    renderedType = renderUnionType(ctx, type);
  } else if(isIntersectionType(type)){
    renderedType = renderIntersectionType(ctx, type);
  } else if(isInstanceType(type)){
    renderedType = renderInstanceType(ctx, type);
  // } else if(isObjectLiteralType(type)){
  //   renderedType = renderObjectLiteralType(ctx, type);
  //  else if(isTypeReferenceType(type)){
  //   renderedType = renderTypeReferenceType(ctx, type);
  // } else if(isArrayType(type)){
  //   renderedType = renderArrayType(ctx, type);
  // } else if(isTupleType(type)){
  //   renderedType = renderTupleType(ctx, type);
  } else {
    renderedType = "";
  }

  if(enableEncapsulation === true){
    const renderConfig = getRenderConfig(ctx);
    return encapsulate(renderedType, renderConfig.typeEncapsulation);
  } else {
    return renderedType;
  }

}
