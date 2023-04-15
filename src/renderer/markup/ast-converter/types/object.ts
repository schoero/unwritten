import {
  convertFunctionLikeEntityForDocumentation,
  convertPropertyEntityForDocumentation,
  convertSignatureEntityForDocumentation
} from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { createListNode } from "unwritten:renderer/markup/utils/nodes.js";

import type {
  ClassType,
  InterfaceType,
  ObjectLiteralType,
  ObjectType,
  TypeLiteralType
} from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedObjectType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertObjectType(ctx: MarkupRenderContexts, objectLikeType: ClassType | InterfaceType | ObjectLiteralType | ObjectType | TypeLiteralType): ConvertedObjectType {

  const convertedConstructSignatures = objectLikeType.constructSignatures.map(
    constructSignature =>
      convertSignatureEntityForDocumentation(ctx, constructSignature, false)
  );

  const convertedCallSignatures = objectLikeType.callSignatures.map(
    callSignature =>
      convertSignatureEntityForDocumentation(ctx, callSignature, false)
  );

  const convertedProperties = objectLikeType.properties.map(
    propertyEntity =>
      convertPropertyEntityForDocumentation(ctx, propertyEntity, false)
  );

  const convertedMethods = objectLikeType.methods.map(
    methodEntity =>
      convertFunctionLikeEntityForDocumentation(ctx, methodEntity, false)
  );

  const convertedSetters = objectLikeType.setters.map(
    setterEntity =>
      convertFunctionLikeEntityForDocumentation(ctx, setterEntity, false)
  );

  const convertedGetters = objectLikeType.getters.map(
    getterEntity =>
      convertFunctionLikeEntityForDocumentation(ctx, getterEntity, false)
  );

  return createListNode(
    convertedConstructSignatures,
    convertedCallSignatures,
    convertedProperties,
    convertedMethods,
    convertedSetters,
    convertedGetters
  );

}
