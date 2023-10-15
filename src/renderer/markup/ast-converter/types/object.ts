import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { filterOutPrivateMembers, filterOutPrivateSignatures } from "unwritten:renderer/utils/private-members.js";
import {
  convertEventPropertyEntityForType,
  convertFunctionLikeEntityForType,
  convertPropertyEntityForType,
  convertSignatureEntityForType
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { createLinkNode, createListNode, createMultilineNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { ObjectLikeTypes } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNode } from "unwritten:renderer:markup/types-definitions/nodes.js";
import type {
  ConvertedObjectType,
  ConvertedObjectTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertObjectTypeInline(
  ctx: MarkupRenderContexts,
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
  ctx: MarkupRenderContexts,
  objectLikeType: ObjectLikeTypes
): ConvertedObjectTypeMultiline {

  const renderConfig = getRenderConfig(ctx);

  const constructSignatures = renderConfig.renderPrivateMembers ? objectLikeType.constructSignatures : filterOutPrivateSignatures(objectLikeType.constructSignatures);
  const callSignatures = renderConfig.renderPrivateMembers ? objectLikeType.callSignatures : filterOutPrivateSignatures(objectLikeType.callSignatures);
  const properties = renderConfig.renderPrivateMembers ? objectLikeType.properties : filterOutPrivateMembers(objectLikeType.properties);
  const methods = renderConfig.renderPrivateMembers ? objectLikeType.methods : filterOutPrivateMembers(objectLikeType.methods);
  const setters = renderConfig.renderPrivateMembers ? objectLikeType.setters : filterOutPrivateMembers(objectLikeType.setters);
  const getters = renderConfig.renderPrivateMembers ? objectLikeType.getters : filterOutPrivateMembers(objectLikeType.getters);
  const events = renderConfig.renderPrivateMembers ? objectLikeType.events : filterOutPrivateMembers(objectLikeType.events);

  const convertedConstructSignatures = constructSignatures.map(
    constructSignature => {
      const convertedSignature = convertSignatureEntityForType(ctx, constructSignature);
      (convertedSignature.children[0] as ASTNode[]).unshift("new ");
      return convertedSignature;
    }
  );

  const convertedCallSignatures = callSignatures.map(
    callSignature =>
      convertSignatureEntityForType(ctx, callSignature)
  );

  const convertedProperties = properties.map(
    propertyEntity =>
      convertPropertyEntityForType(ctx, propertyEntity)
  );

  const convertedEventProperties = events.map(
    eventPropertyEntity =>
      convertEventPropertyEntityForType(ctx, eventPropertyEntity)
  );

  const convertedMethods = methods.flatMap(
    methodEntity =>
      convertFunctionLikeEntityForType(ctx, methodEntity)
  );

  const convertedSetters = setters.flatMap(
    setterEntity =>
      convertFunctionLikeEntityForType(ctx, setterEntity)
  );

  const convertedGetters = getters.flatMap(
    getterEntity =>
      convertFunctionLikeEntityForType(ctx, getterEntity)
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

function getObjectTypeName(ctx: MarkupRenderContexts, objectLikeType: ObjectLikeTypes) {

  const translate = getTranslator(ctx);

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
