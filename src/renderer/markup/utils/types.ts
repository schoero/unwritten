import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import {
  isClassType,
  isFunctionType,
  isInterfaceType,
  isObjectLiteralType,
  isObjectType,
  isTypeLiteralType,
  isTypeReferenceType,
  isUndefinedType,
  isUnionType
} from "unwritten:typeguards/types.js";

import type { MultilineTypes, Types } from "unwritten:interpreter/type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";


export function isMultilineType(ctx: MarkupRenderContexts, type: Types): type is MultilineTypes {
  return isObjectType(type) ||
  isObjectLiteralType(type) ||
  isFunctionType(type) ||
  isTypeLiteralType(type) ||
  isClassType(type) ||
  isInterfaceType(type) ||
  isTypeReferenceType(type);
}

export function removeUndefinedTypeFromOptionalUnionType(ctx: MarkupRenderContexts, type: Types): Types {

  const renderConfig = getRenderConfig(ctx);

  if(isUnionType(type) && !renderConfig.renderUndefinedInOptionalTypes){
    if(type.types.length === 2 && type.types.some(type => isUndefinedType(type))){
      const actualTypeIndex = type.types.findIndex(type => !isUndefinedType(type));
      return type.types[actualTypeIndex];
    } else {
      return {
        ...type,
        types: type.types.filter(type => !isUndefinedType(type))
      };
    }
  }

  return type;

}
