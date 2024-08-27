import { TypeKind } from "unwritten:interpreter/enums/type";
import {
  convertEventPropertyEntityForType,
  convertFunctionLikeEntityForType,
  convertPropertyEntityForType,
  convertSignatureEntityForType
} from "unwritten:renderer:markup/ast-converter/entities/index";
import { createLinkNode, createListNode, createMultilineNode } from "unwritten:renderer:markup/utils/nodes";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer";
import { getTranslator } from "unwritten:renderer:markup/utils/translations";
import {
  internalMemberFilter,
  internalSignatureFilter,
  privateMemberFilter,
  privateSignatureFilter
} from "unwritten:renderer/markup/utils/filter";
import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { ObjectLikeTypes } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ASTNode } from "unwritten:renderer:markup/types-definitions/nodes";
import type {
  ConvertedObjectType,
  ConvertedObjectTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertObjectTypeInline(
  ctx: MarkupRenderContext,
  objectLikeType: ObjectLikeTypes
): ConvertedObjectType {

  const renderConfig = getRenderConfig(ctx);

  const encapsulatedType = encapsulate(
    getObjectTypeName(ctx, objectLikeType),
    renderConfig.typeEncapsulation
  );

  return ctx.config.externalTypes[TypeKind.Object]
    ? createLinkNode(encapsulatedType, ctx.config.externalTypes[TypeKind.Object])
    : encapsulatedType;

}


export function convertObjectTypeMultiline(
  ctx: MarkupRenderContext,
  objectLikeType: ObjectLikeTypes
): ConvertedObjectTypeMultiline {

  const renderConfig = getRenderConfig(ctx);

  const constructSignatures = objectLikeType.constructSignatures.filter(privateSignatureFilter, ctx).filter(internalSignatureFilter, ctx);
  const callSignatures = objectLikeType.callSignatures.filter(privateSignatureFilter, ctx).filter(internalSignatureFilter, ctx);
  const properties = objectLikeType.properties.filter(privateMemberFilter, ctx).filter(internalMemberFilter, ctx);
  const methods = objectLikeType.methods.filter(privateMemberFilter, ctx).filter(internalMemberFilter, ctx);
  const setters = objectLikeType.setters.filter(privateMemberFilter, ctx).filter(internalMemberFilter, ctx);
  const getters = objectLikeType.getters.filter(privateMemberFilter, ctx).filter(internalMemberFilter, ctx);
  const events = objectLikeType.events.filter(privateMemberFilter, ctx).filter(internalMemberFilter, ctx);

  const convertedConstructSignatures = constructSignatures.map(
    constructSignature => {
      const convertedSignature = convertSignatureEntityForType(ctx, constructSignature);
      (convertedSignature.children[0] as ASTNode[]).unshift("new ");
      return convertedSignature;
    }
  );

  const convertedCallSignatures = callSignatures.map(
    callSignature => convertSignatureEntityForType(ctx, callSignature)
  );

  const convertedProperties = properties.map(
    propertyEntity => convertPropertyEntityForType(ctx, propertyEntity)
  );

  const convertedEventProperties = events.map(
    eventPropertyEntity => convertEventPropertyEntityForType(ctx, eventPropertyEntity)
  );

  const convertedMethods = methods.flatMap(
    methodEntity => convertFunctionLikeEntityForType(ctx, methodEntity)
  );

  const convertedSetters = setters.flatMap(
    setterEntity => convertFunctionLikeEntityForType(ctx, setterEntity)
  );

  const convertedGetters = getters.flatMap(
    getterEntity => convertFunctionLikeEntityForType(ctx, getterEntity)
  );

  return createMultilineNode(
    createListNode(...convertedConstructSignatures),
    createListNode(...convertedCallSignatures),
    createListNode(...convertedProperties),
    createListNode(...convertedMethods),
    createListNode(...convertedSetters),
    createListNode(...convertedGetters),
    createListNode(...convertedEventProperties)
  );

}

function getObjectTypeName(ctx: MarkupRenderContext, objectLikeType: ObjectLikeTypes) {

  const translate = getTranslator(ctx);

  if(objectLikeType.name && !isAnonymousObjectType(ctx, objectLikeType)){
    return objectLikeType.name;
  }

  switch (objectLikeType.kind){
    case TypeKind.Class:
      return translate("class");
    case TypeKind.Interface:
      return translate("interface");
    case TypeKind.ObjectLiteral:
      return translate("object");
    case TypeKind.Object:
      return translate("object");
    case TypeKind.TypeLiteral:
      return translate("typeLiteral");
    default:
      return translate("object");
  }

}

function isAnonymousObjectType(ctx: MarkupRenderContext, objectLikeType: ObjectLikeTypes) {
  return !objectLikeType.name || objectLikeType.name.startsWith("__");
}
