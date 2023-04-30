import {
  convertFunctionLikeEntityForType,
  convertPropertyEntityForType,
  convertSignatureEntityForType
} from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { createListNode } from "unwritten:renderer/markup/utils/nodes.js";

import type {
  ClassType,
  InterfaceType,
  ObjectLiteralType,
  ObjectType,
  TypeLiteralType
} from "unwritten:interpreter:type-definitions/types.js";
import type { ASTNodes } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedObjectType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertObjectType(ctx: MarkupRenderContexts, objectLikeType: ClassType | InterfaceType | ObjectLiteralType | ObjectType | TypeLiteralType): ConvertedObjectType {

  const convertedConstructSignatures = objectLikeType.constructSignatures.map(
    constructSignature => {
      const convertedSignature = convertSignatureEntityForType(ctx, constructSignature);
      (convertedSignature[0] as ASTNodes[]).unshift("new ");
      return convertedSignature;
    }
  );

  const convertedCallSignatures = objectLikeType.callSignatures.map(
    callSignature =>
      convertSignatureEntityForType(ctx, callSignature)
  );

  const convertedProperties = objectLikeType.properties.map(
    propertyEntity =>
      convertPropertyEntityForType(ctx, propertyEntity)
  );

  const convertedMethods = objectLikeType.methods.flatMap(
    methodEntity =>
      convertFunctionLikeEntityForType(ctx, methodEntity)
  );

  const convertedSetters = objectLikeType.setters.flatMap(
    setterEntity =>
      convertFunctionLikeEntityForType(ctx, setterEntity)
  );

  const convertedGetters = objectLikeType.getters.flatMap(
    getterEntity =>
      convertFunctionLikeEntityForType(ctx, getterEntity)
  );

  return createListNode(
    ...convertedConstructSignatures,
    ...convertedCallSignatures,
    ...convertedProperties,
    ...convertedMethods,
    ...convertedSetters,
    ...convertedGetters
  );

}
