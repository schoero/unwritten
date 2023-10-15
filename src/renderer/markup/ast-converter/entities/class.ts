import { convertSeeTagsForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/see.js";
import { registerAnchor, registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { filterOutImplicitSignatures, filterOutPrivateMembers } from "unwritten:renderer/utils/private-members.js";
import {
  convertEventPropertyEntityForDocumentation,
  convertEventPropertyEntityForTableOfContents,
  convertFunctionLikeEntityForDocumentation,
  convertFunctionLikeEntityForTableOfContents,
  convertPropertyEntityForDocumentation,
  convertPropertyEntityForTableOfContents,
  convertSignatureEntityForDocumentation,
  convertSignatureEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { convertDescriptionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/description.js";
import { convertExamplesForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/example.js";
import { convertPositionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { convertRemarksForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/remarks.js";
import { convertTagsForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/tags.js";
import { SECTION_TYPE } from "unwritten:renderer:markup/types-definitions/sections.js";
import {
  createAnchorNode,
  createListNode,
  createSectionNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";
import {
  extendClassEntityConstructorsWithHeritage,
  extendClassEntityEntitiesWithHeritage
} from "unwritten:renderer:utils/heritage.js";

import type { ClassEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { AnchorNode } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedClassEntityForDocumentation,
  ConvertedClassEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertClassEntityToAnchor(ctx: MarkupRenderContexts, classEntity: ClassEntity, displayName?: string): AnchorNode {

  const name = classEntity.name;
  const id = classEntity.symbolId;

  return createAnchorNode(
    name,
    id,
    displayName
  );

}

export function convertClassEntityForTableOfContents(ctx: MarkupRenderContexts, classEntity: ClassEntity): ConvertedClassEntityForTableOfContents {

  const renderConfig = getRenderConfig(ctx);
  const translate = getTranslator(ctx);

  const anchor = convertClassEntityToAnchor(ctx, classEntity);

  const constructorEntity = extendClassEntityConstructorsWithHeritage(classEntity);
  const propertyEntities = extendClassEntityEntitiesWithHeritage(classEntity, "properties");
  const eventPropertyEntities = extendClassEntityEntitiesWithHeritage(classEntity, "events");
  const methodEntities = extendClassEntityEntitiesWithHeritage(classEntity, "methods");
  const setterEntities = extendClassEntityEntitiesWithHeritage(classEntity, "setters");
  const getterEntities = extendClassEntityEntitiesWithHeritage(classEntity, "getters");

  const publicConstructorEntity = renderConfig.renderPrivateMembers ? constructorEntity : constructorEntity && filterOutPrivateMembers([constructorEntity])[0];
  const publicPropertyEntities = renderConfig.renderPrivateMembers ? propertyEntities : filterOutPrivateMembers(propertyEntities);
  const publicEventPropertyEntities = renderConfig.renderPrivateMembers ? eventPropertyEntities : filterOutPrivateMembers(eventPropertyEntities);
  const publicMethodEntities = renderConfig.renderPrivateMembers ? methodEntities : filterOutPrivateMembers(methodEntities);
  const publicSetterEntities = renderConfig.renderPrivateMembers ? setterEntities : filterOutPrivateMembers(setterEntities);
  const publicGetterEntities = renderConfig.renderPrivateMembers ? getterEntities : filterOutPrivateMembers(getterEntities);

  const explicitConstructSignatures = publicConstructorEntity?.signatures && filterOutImplicitSignatures(publicConstructorEntity.signatures);
  const convertedConstructSignatures = explicitConstructSignatures?.map(signatureEntity => convertSignatureEntityForTableOfContents(ctx, signatureEntity));
  const convertedProperties = publicPropertyEntities.map(propertyEntity => convertPropertyEntityForTableOfContents(ctx, propertyEntity));
  const convertedEventProperties = publicEventPropertyEntities.map(eventPropertyEntity => convertEventPropertyEntityForTableOfContents(ctx, eventPropertyEntity));
  const convertedMethods = publicMethodEntities.flatMap(methodEntity => convertFunctionLikeEntityForTableOfContents(ctx, methodEntity)).flat();
  const convertedSetters = publicSetterEntities.flatMap(setterEntity => convertFunctionLikeEntityForTableOfContents(ctx, setterEntity));
  const convertedGetters = publicGetterEntities.flatMap(getterEntity => convertFunctionLikeEntityForTableOfContents(ctx, getterEntity));

  const constructorList = convertedConstructSignatures && convertedConstructSignatures.length > 0
    ? [translate("ctor", { capitalize: true, count: convertedConstructSignatures.length }), createListNode(...convertedConstructSignatures)]
    : [];

  const propertyList = convertedProperties.length > 0
    ? [translate("property", { capitalize: true, count: convertedProperties.length }), createListNode(...convertedProperties)]
    : [];

  const eventPropertyList = convertedEventProperties.length > 0
    ? [translate("event", { capitalize: true, count: convertedEventProperties.length }), createListNode(...convertedEventProperties)]
    : [];

  const methodList = convertedMethods.length > 0
    ? [translate("method", { capitalize: true, count: convertedMethods.length }), createListNode(...convertedMethods)]
    : [];

  const setterList = convertedSetters.length > 0
    ? [translate("setter", { capitalize: true, count: convertedSetters.length }), createListNode(...convertedSetters)]
    : [];

  const getterList = convertedGetters.length > 0
    ? [translate("getter", { capitalize: true, count: convertedGetters.length }), createListNode(...convertedGetters)]
    : [];

  return [
    anchor,
    createListNode(
      ...constructorList,
      ...propertyList,
      ...methodList,
      ...setterList,
      ...getterList,
      ...eventPropertyList
    )
  ];

}


export function convertClassEntityForDocumentation(ctx: MarkupRenderContexts, classEntity: ClassEntity): ConvertedClassEntityForDocumentation {

  const renderConfig = getRenderConfig(ctx);
  const translate = getTranslator(ctx);

  const name = classEntity.name;
  const symbolId = classEntity.symbolId;
  const typeId = classEntity.typeId;

  const anchor = registerAnchor(ctx, name, symbolId);

  const position = convertPositionForDocumentation(ctx, classEntity.position);
  const tags = convertTagsForDocumentation(ctx, classEntity);

  const description = classEntity.description && convertDescriptionForDocumentation(ctx, classEntity.description);
  const example = classEntity.example && convertExamplesForDocumentation(ctx, classEntity.example);
  const remarks = classEntity.remarks && convertRemarksForDocumentation(ctx, classEntity.remarks);
  const see = classEntity.see && convertSeeTagsForDocumentation(ctx, classEntity.see);

  const constructorEntity = extendClassEntityConstructorsWithHeritage(classEntity);
  const propertyEntities = extendClassEntityEntitiesWithHeritage(classEntity, "properties");
  const methodEntities = extendClassEntityEntitiesWithHeritage(classEntity, "methods");
  const setterEntities = extendClassEntityEntitiesWithHeritage(classEntity, "setters");
  const getterEntities = extendClassEntityEntitiesWithHeritage(classEntity, "getters");
  const eventPropertyEntities = extendClassEntityEntitiesWithHeritage(classEntity, "events");

  const publicConstructorEntity = renderConfig.renderPrivateMembers ? constructorEntity : constructorEntity && filterOutPrivateMembers([constructorEntity])[0];
  const publicPropertyEntities = renderConfig.renderPrivateMembers ? propertyEntities : filterOutPrivateMembers(propertyEntities);
  const publicMethodEntities = renderConfig.renderPrivateMembers ? methodEntities : filterOutPrivateMembers(methodEntities);
  const publicSetterEntities = renderConfig.renderPrivateMembers ? setterEntities : filterOutPrivateMembers(setterEntities);
  const publicGetterEntities = renderConfig.renderPrivateMembers ? getterEntities : filterOutPrivateMembers(getterEntities);
  const publicEventPropertyEntities = renderConfig.renderPrivateMembers ? eventPropertyEntities : filterOutPrivateMembers(eventPropertyEntities);

  const explicitConstructSignatures = publicConstructorEntity?.signatures && filterOutImplicitSignatures(publicConstructorEntity.signatures);

  const hasConstructSignatures = explicitConstructSignatures && explicitConstructSignatures.length > 0;
  const constructSignaturesTranslation = translate("constructSignature", { capitalizeEach: true, count: explicitConstructSignatures?.length });
  const constructSignaturesAnchor = hasConstructSignatures && registerAnonymousAnchor(ctx, constructSignaturesTranslation);

  const hasProperties = publicPropertyEntities.length > 0;
  const propertiesTranslation = translate("property", { capitalizeEach: true, count: publicPropertyEntities.length });
  const propertiesAnchor = hasProperties && registerAnonymousAnchor(ctx, propertiesTranslation);

  const hasMethods = publicMethodEntities.length > 0;
  const methodsTranslation = translate("method", { capitalizeEach: true, count: publicMethodEntities.length });
  const methodsAnchor = hasMethods && registerAnonymousAnchor(ctx, methodsTranslation);

  const hasSetters = publicSetterEntities.length > 0;
  const settersTranslation = translate("setter", { capitalizeEach: true, count: publicSetterEntities.length });
  const settersAnchor = hasSetters && registerAnonymousAnchor(ctx, settersTranslation);

  const hasGetters = publicGetterEntities.length > 0;
  const gettersTranslation = translate("getter", { capitalizeEach: true, count: publicGetterEntities.length });
  const gettersAnchor = hasGetters && registerAnonymousAnchor(ctx, gettersTranslation);

  const hasEventProperties = publicEventPropertyEntities.length > 0;
  const eventPropertiesTranslation = translate("event", { capitalizeEach: true, count: publicEventPropertyEntities.length });
  const eventPropertiesAnchor = hasEventProperties && registerAnonymousAnchor(ctx, eventPropertiesTranslation);

  const convertedConstructSignatures = explicitConstructSignatures?.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity)) ?? [];
  const convertedProperties = publicPropertyEntities.map(propertyEntity => convertPropertyEntityForDocumentation(ctx, propertyEntity));
  const convertedEventProperties = publicEventPropertyEntities.map(eventPropertyEntity => convertEventPropertyEntityForDocumentation(ctx, eventPropertyEntity));
  const convertedMethods = publicMethodEntities.flatMap(methodEntity => convertFunctionLikeEntityForDocumentation(ctx, methodEntity));
  const convertedSetters = publicSetterEntities.flatMap(setterEntity => convertFunctionLikeEntityForDocumentation(ctx, setterEntity));
  const convertedGetters = publicGetterEntities.flatMap(getterEntity => convertFunctionLikeEntityForDocumentation(ctx, getterEntity));

  const constructSignatures = constructSignaturesAnchor && createTitleNode(constructSignaturesTranslation, constructSignaturesAnchor, ...convertedConstructSignatures);
  const properties = propertiesAnchor && createTitleNode(propertiesTranslation, propertiesAnchor, ...convertedProperties);
  const methods = methodsAnchor && createTitleNode(methodsTranslation, methodsAnchor, ...convertedMethods);
  const getters = gettersAnchor && createTitleNode(gettersTranslation, gettersAnchor, ...convertedGetters);
  const setters = settersAnchor && createTitleNode(settersTranslation, settersAnchor, ...convertedSetters);
  const eventProperties = eventPropertiesAnchor && createTitleNode(eventPropertiesTranslation, eventPropertiesAnchor, ...convertedEventProperties);

  return createSectionNode(
    SECTION_TYPE[classEntity.kind],
    createTitleNode(
      name,
      anchor,
      tags,
      position,
      description,
      remarks,
      example,
      see,
      constructSignatures,
      properties,
      methods,
      setters,
      getters,
      eventProperties
    )
  );

}
