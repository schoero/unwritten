import { TypeKind } from "unwritten:interpreter/enums/types.js";
import {
  convertFunctionLikeEntityForType,
  convertPropertyEntityForType,
  convertSignatureEntityForType
} from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { createLinkNode, createListNode } from "unwritten:renderer/markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { filterPrivateMembers, filterPrivateSignatures } from "unwritten:renderer/utils/private-members.js";

import type {
  ClassType,
  InterfaceType,
  ObjectLiteralType,
  ObjectType,
  TypeLiteralType
} from "unwritten:interpreter:type-definitions/types.js";
import type { ASTNodes } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedObjectType,
  ConvertedObjectTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertObjectTypeInline(
  ctx: MarkupRenderContexts,
  objectLikeType:
  | ClassType
  | InterfaceType
  | ObjectLiteralType
  | ObjectType
  | TypeLiteralType
): ConvertedObjectType {

  const translate = getTranslator(ctx);
  const renderConfig = getRenderConfig(ctx);

  const encapsulatedType = encapsulate(
    translate("object", { count: 1 }),
    renderConfig.typeEncapsulation
  );

  return ctx.config.externalTypes[TypeKind.Object]
    ? createLinkNode(encapsulatedType, ctx.config.externalTypes[TypeKind.Object])
    : encapsulatedType;

}


export function convertObjectTypeMultiline(
  ctx: MarkupRenderContexts,
  objectLikeType:
  | ClassType
  | InterfaceType
  | ObjectLiteralType
  | ObjectType
  | TypeLiteralType
): ConvertedObjectTypeMultiline {

  const renderConfig = getRenderConfig(ctx);

  const constructSignatures = renderConfig.renderPrivateMembers ? objectLikeType.constructSignatures : filterPrivateSignatures(objectLikeType.constructSignatures);
  const callSignatures = renderConfig.renderPrivateMembers ? objectLikeType.callSignatures : filterPrivateSignatures(objectLikeType.callSignatures);
  const properties = renderConfig.renderPrivateMembers ? objectLikeType.properties : filterPrivateMembers(objectLikeType.properties);
  const methods = renderConfig.renderPrivateMembers ? objectLikeType.methods : filterPrivateMembers(objectLikeType.methods);
  const setters = renderConfig.renderPrivateMembers ? objectLikeType.setters : filterPrivateMembers(objectLikeType.setters);
  const getters = renderConfig.renderPrivateMembers ? objectLikeType.getters : filterPrivateMembers(objectLikeType.getters);

  const convertedConstructSignatures = constructSignatures.map(
    constructSignature => {
      const convertedSignature = convertSignatureEntityForType(ctx, constructSignature);
      (convertedSignature[0] as ASTNodes[]).unshift("new ");
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

  return [
    createListNode(...convertedConstructSignatures),
    createListNode(...convertedCallSignatures),
    createListNode(...convertedProperties),
    createListNode(...convertedMethods),
    createListNode(...convertedSetters),
    createListNode(...convertedGetters)
  ];

}
