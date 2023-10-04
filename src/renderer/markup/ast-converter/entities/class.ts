import { registerAnchor, registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { filterImplicitSignatures, filterPrivateMembers } from "unwritten:renderer/utils/private-members.js";
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
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedClassEntityForDocumentation,
  ConvertedClassEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertClassEntityForTableOfContents(ctx: MarkupRenderContexts, classEntity: ClassEntity): ConvertedClassEntityForTableOfContents {

  const renderConfig = getRenderConfig(ctx);
  const translate = getTranslator(ctx);

  const name = classEntity.name;
  const id = classEntity.symbolId;

  const anchor = createAnchorNode(
    name,
    id
  );

  const constructorEntity = extendClassEntityConstructorsWithHeritage(classEntity);
  const propertyEntities = extendClassEntityEntitiesWithHeritage(classEntity, "properties");
  const eventPropertyEntities = extendClassEntityEntitiesWithHeritage(classEntity, "events");
  const methodEntities = extendClassEntityEntitiesWithHeritage(classEntity, "methods");
  const setterEntities = extendClassEntityEntitiesWithHeritage(classEntity, "setters");
  const getterEntities = extendClassEntityEntitiesWithHeritage(classEntity, "getters");

  const publicConstructorEntity = renderConfig.renderPrivateMembers ? constructorEntity : constructorEntity && filterPrivateMembers([constructorEntity])[0];
  const publicPropertyEntities = renderConfig.renderPrivateMembers ? propertyEntities : filterPrivateMembers(propertyEntities);
  const publicEventPropertyEntities = renderConfig.renderPrivateMembers ? eventPropertyEntities : filterPrivateMembers(eventPropertyEntities);
  const publicMethodEntities = renderConfig.renderPrivateMembers ? methodEntities : filterPrivateMembers(methodEntities);
  const publicSetterEntities = renderConfig.renderPrivateMembers ? setterEntities : filterPrivateMembers(setterEntities);
  const publicGetterEntities = renderConfig.renderPrivateMembers ? getterEntities : filterPrivateMembers(getterEntities);

  const explicitConstructSignatures = publicConstructorEntity?.signatures && filterImplicitSignatures(publicConstructorEntity.signatures);
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

  const convertedPosition = convertPositionForDocumentation(ctx, classEntity.position);
  const convertedTags = convertTagsForDocumentation(ctx, classEntity);
  const convertedDescription = convertDescriptionForDocumentation(ctx, classEntity.description);
  const convertedExample = convertExamplesForDocumentation(ctx, classEntity.example);
  const convertedRemarks = convertRemarksForDocumentation(ctx, classEntity.remarks);

  const constructorEntity = extendClassEntityConstructorsWithHeritage(classEntity);
  const propertyEntities = extendClassEntityEntitiesWithHeritage(classEntity, "properties");
  const eventPropertyEntities = extendClassEntityEntitiesWithHeritage(classEntity, "events");
  const methodEntities = extendClassEntityEntitiesWithHeritage(classEntity, "methods");
  const setterEntities = extendClassEntityEntitiesWithHeritage(classEntity, "setters");
  const getterEntities = extendClassEntityEntitiesWithHeritage(classEntity, "getters");

  const publicConstructorEntity = renderConfig.renderPrivateMembers ? constructorEntity : constructorEntity && filterPrivateMembers([constructorEntity])[0];
  const publicPropertyEntities = renderConfig.renderPrivateMembers ? propertyEntities : filterPrivateMembers(propertyEntities);
  const publicEventPropertyEntities = renderConfig.renderPrivateMembers ? eventPropertyEntities : filterPrivateMembers(eventPropertyEntities);
  const publicMethodEntities = renderConfig.renderPrivateMembers ? methodEntities : filterPrivateMembers(methodEntities);
  const publicSetterEntities = renderConfig.renderPrivateMembers ? setterEntities : filterPrivateMembers(setterEntities);
  const publicGetterEntities = renderConfig.renderPrivateMembers ? getterEntities : filterPrivateMembers(getterEntities);

  const explicitConstructSignatures = publicConstructorEntity?.signatures && filterImplicitSignatures(publicConstructorEntity.signatures);
  const convertedConstructSignatures = explicitConstructSignatures?.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity)) ?? [];
  const convertedProperties = publicPropertyEntities.map(propertyEntity => convertPropertyEntityForDocumentation(ctx, propertyEntity));
  const convertedEventProperties = publicEventPropertyEntities.map(eventPropertyEntity => convertEventPropertyEntityForDocumentation(ctx, eventPropertyEntity));
  const convertedMethods = publicMethodEntities.flatMap(methodEntity => convertFunctionLikeEntityForDocumentation(ctx, methodEntity));
  const convertedSetters = publicSetterEntities.flatMap(setterEntity => convertFunctionLikeEntityForDocumentation(ctx, setterEntity));
  const convertedGetters = publicGetterEntities.flatMap(getterEntity => convertFunctionLikeEntityForDocumentation(ctx, getterEntity));

  const constructSignaturesTranslation = translate("constructSignature", { capitalizeEach: true, count: convertedConstructSignatures.length });
  const constructSignaturesAnchor = registerAnonymousAnchor(ctx, constructSignaturesTranslation);
  const constructSignatures = createTitleNode(constructSignaturesTranslation, constructSignaturesAnchor, ...convertedConstructSignatures);

  const propertiesTranslation = translate("property", { capitalizeEach: true, count: convertedProperties.length });
  const propertiesAnchor = registerAnonymousAnchor(ctx, propertiesTranslation);
  const properties = createTitleNode(propertiesTranslation, propertiesAnchor, ...convertedProperties);

  const methodsTranslation = translate("method", { capitalizeEach: true, count: convertedMethods.length });
  const methodsAnchor = registerAnonymousAnchor(ctx, methodsTranslation);
  const methods = createTitleNode(methodsTranslation, methodsAnchor, ...convertedMethods);

  const settersTranslation = translate("setter", { capitalizeEach: true, count: convertedSetters.length });
  const settersAnchor = registerAnonymousAnchor(ctx, settersTranslation);
  const setters = createTitleNode(settersTranslation, settersAnchor, ...convertedSetters);

  const gettersTranslation = translate("getter", { capitalizeEach: true, count: convertedGetters.length });
  const gettersAnchor = registerAnonymousAnchor(ctx, gettersTranslation);
  const getters = createTitleNode(gettersTranslation, gettersAnchor, ...convertedGetters);

  const eventPropertiesTranslation = translate("event", { capitalizeEach: true, count: convertedEventProperties.length });
  const eventPropertiesAnchor = registerAnonymousAnchor(ctx, eventPropertiesTranslation);
  const eventProperties = createTitleNode(eventPropertiesTranslation, eventPropertiesAnchor, ...convertedEventProperties);

  return createSectionNode(
    SECTION_TYPE[classEntity.kind],
    createTitleNode(
      name,
      anchor,
      convertedTags,
      convertedPosition,
      convertedDescription,
      convertedRemarks,
      convertedExample,
      constructSignatures,
      properties,
      methods,
      setters,
      getters,
      eventProperties
    )
  );

}
