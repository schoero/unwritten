import {
  convertFunctionLikeEntityForDocumentation,
  convertPropertyEntityForDocumentation,
  convertSignatureEntityForDocumentation
} from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { createListNode } from "unwritten:renderer/markup/utils/nodes.js";

import type {
  InterfaceType,
  ObjectLiteralType,
  ObjectType,
  TypeLiteralType
} from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedInterfaceType,
  ConvertedObjectType,
  ConvertedTypeLiteralType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertObjectType(ctx: MarkupRenderContexts, objectLiteralType: ObjectLiteralType): ConvertedObjectType;
export function convertObjectType(ctx: MarkupRenderContexts, interfaceType: InterfaceType): ConvertedInterfaceType;
export function convertObjectType(ctx: MarkupRenderContexts, typeLiteralType: TypeLiteralType): ConvertedTypeLiteralType;
export function convertObjectType(ctx: MarkupRenderContexts, objectType: ObjectType): ConvertedObjectType;
export function convertObjectType(ctx: MarkupRenderContexts, objectLikeType: InterfaceType | ObjectLiteralType | ObjectType | TypeLiteralType): ConvertedObjectType {

  const convertedProperties = objectLikeType.properties.map(propertyEntity => convertPropertyEntityForDocumentation(ctx, propertyEntity));
  const convertedConstructSignatures = objectLikeType.constructSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedCallSignatures = objectLikeType.callSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedSetters = objectLikeType.setters.map(setterEntity => convertFunctionLikeEntityForDocumentation(ctx, setterEntity));
  const convertedGetters = objectLikeType.getters.map(getterEntity => convertFunctionLikeEntityForDocumentation(ctx, getterEntity));
  const convertedMethods = objectLikeType.methods.map(methodEntity => convertFunctionLikeEntityForDocumentation(ctx, methodEntity));

  return createListNode([
    convertedConstructSignatures,
    convertedCallSignatures,
    convertedProperties,
    convertedMethods,
    convertedSetters,
    convertedGetters
  ]);

}
