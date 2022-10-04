import { assert } from "vitest";

import { getRenderConfig } from "../../config/index.js";
import { isLiteralType, isPrimitiveType, isStringLiteralType } from "../../typeguards/types.js";
import { LiteralTypes, PrimitiveTypes, Types } from "../../types/types.js";
import { encapsulate } from "../../utils/renderer.js";


export function renderType(type: Types): string {

  let renderedType: string | undefined;

  if(isLiteralType(type)){
    renderedType = _renderLiteralType(type);
  } else if(isPrimitiveType(type)){
    renderedType = _renderPrimitiveType(type);
  }

  assert(renderedType !== undefined, "Type is not yet supported.");

  const encapsulation = getRenderConfig().typeEncapsulation;
  const encapsulatedType = encapsulate(renderedType, encapsulation);

  return encapsulatedType;

}


function _renderLiteralType(type: LiteralTypes): string {

  if(isStringLiteralType(type)){
    return _renderStringLiteralType(type);
  } else {
    return `${type.value}`;
  }

}

function _renderStringLiteralType(type: LiteralTypes): string {
  const encapsulation = getRenderConfig().stringLiteralTypeEncapsulation;
  const encapsulated = encapsulate(`${type.value}`, encapsulation);
  return encapsulated;
}


function _renderPrimitiveType(type: PrimitiveTypes): string {
  // TODO: link to external documentation
  return type.name;
}