import {
  convertFunctionLikeEntityForDocumentation,
  convertPropertyEntityForDocumentation,
  convertSignatureEntityForDocumentation
} from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { createTitleNode } from "unwritten:renderer/markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";

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

  const translate = getTranslator(ctx);

  const convertedProperties = objectLikeType.properties.map(propertyEntity => convertPropertyEntityForDocumentation(ctx, propertyEntity));
  const convertedConstructSignatures = objectLikeType.constructSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedCallSignatures = objectLikeType.callSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedSetters = objectLikeType.setters.map(setterEntity => convertFunctionLikeEntityForDocumentation(ctx, setterEntity));
  const convertedGetters = objectLikeType.getters.map(getterEntity => convertFunctionLikeEntityForDocumentation(ctx, getterEntity));
  const convertedMethods = objectLikeType.methods.map(methodEntity => convertFunctionLikeEntityForDocumentation(ctx, methodEntity));

  return [
    createTitleNode(translate("construct-signature", { count: 99 }), undefined, convertedConstructSignatures),
    createTitleNode(translate("call-signature", { count: 99 }), undefined, convertedCallSignatures),
    createTitleNode(translate("property", { count: 99 }), undefined, convertedProperties),
    createTitleNode(translate("method", { count: 99 }), undefined, convertedMethods),
    createTitleNode(translate("setter", { count: 99 }), undefined, convertedSetters),
    createTitleNode(translate("getter", { count: 99 }), undefined, convertedGetters)
  ];

}
