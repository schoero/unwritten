import { convertSeeTagsForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/see";
import { registerAnchor, registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry";
import { renderMemberContext, withMemberContext } from "unwritten:renderer/markup/utils/context";
import { isRenderObjectMemberTitlesEnabled, renderEntityPrefix } from "unwritten:renderer/markup/utils/renderer.js";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import { filterOutImplicitSignatures, filterOutPrivateMembers } from "unwritten:renderer/utils/private-members";
import {
  convertEventPropertyEntityForDocumentation,
  convertEventPropertyEntityForTableOfContents,
  convertFunctionLikeEntityForDocumentation,
  convertFunctionLikeEntityForTableOfContents,
  convertPropertyEntityForDocumentation,
  convertPropertyEntityForTableOfContents,
  convertSignatureEntityForDocumentation,
  convertSignatureEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index";
import { convertDescriptionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/description";
import { convertExamplesForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/example";
import { convertPositionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/position";
import { convertRemarksForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/remarks";
import { convertTagsForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/tags";
import { getSectionType } from "unwritten:renderer:markup/types-definitions/sections";
import {
  createAnchorNode,
  createListNode,
  createSectionNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes";
import { getTranslator } from "unwritten:renderer:markup/utils/translations";
import {
  extendClassEntityConstructorsWithHeritage,
  extendClassEntityEntitiesWithHeritage
} from "unwritten:renderer:utils/heritage";

import type { ClassEntity } from "unwritten:interpreter/type-definitions/entities";
import type { AnchorNode } from "unwritten:renderer/markup/types-definitions/nodes";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedClassEntityForDocumentation,
  ConvertedClassEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertClassEntityToAnchor(ctx: MarkupRenderContext, classEntity: ClassEntity, displayName?: string): AnchorNode {

  const id = classEntity.symbolId;
  const name = classEntity.name;

  const documentationEntityPrefix = renderEntityPrefix(ctx, "documentation", classEntity.kind);
  const documentationName = renderMemberContext(ctx, "documentation", name);

  const tableOfContentsName = renderMemberContext(ctx, "tableOfContents", name);
  const tableOfContentsEntityPrefix = renderEntityPrefix(ctx, "tableOfContents", classEntity.kind);

  const prefixedDocumentationName = documentationEntityPrefix
    ? `${documentationEntityPrefix}: ${documentationName}`
    : documentationName;

  const prefixedTableOfContentsName = tableOfContentsEntityPrefix
    ? `${tableOfContentsEntityPrefix}: ${tableOfContentsName}`
    : tableOfContentsName;

  displayName ??= prefixedTableOfContentsName;

  return createAnchorNode(
    prefixedDocumentationName,
    id,
    displayName
  );

}

export function convertClassEntityForTableOfContents(ctx: MarkupRenderContext, classEntity: ClassEntity): ConvertedClassEntityForTableOfContents {

  const renderConfig = getRenderConfig(ctx);
  const translate = getTranslator(ctx);

  const anchor = convertClassEntityToAnchor(ctx, classEntity);

  return withMemberContext(ctx, classEntity.name, ctx => {

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
    const convertedConstructSignatures = explicitConstructSignatures?.map(signatureEntity => convertSignatureEntityForTableOfContents(ctx, signatureEntity));
    const convertedProperties = publicPropertyEntities.map(propertyEntity => convertPropertyEntityForTableOfContents(ctx, propertyEntity));
    const convertedMethods = publicMethodEntities.flatMap(methodEntity => convertFunctionLikeEntityForTableOfContents(ctx, methodEntity)).flat();
    const convertedSetters = publicSetterEntities.flatMap(setterEntity => convertFunctionLikeEntityForTableOfContents(ctx, setterEntity));
    const convertedGetters = publicGetterEntities.flatMap(getterEntity => convertFunctionLikeEntityForTableOfContents(ctx, getterEntity));
    const convertedEventProperties = publicEventPropertyEntities.map(eventPropertyEntity => convertEventPropertyEntityForTableOfContents(ctx, eventPropertyEntity));

    const constructorList = convertedConstructSignatures && convertedConstructSignatures.length > 0
      ? isRenderObjectMemberTitlesEnabled(ctx, "tableOfContents")
        ? [translate("ctor", { capitalize: true, count: convertedConstructSignatures.length }), createListNode(...convertedConstructSignatures)]
        : [createListNode(...convertedConstructSignatures)]
      : [];

    const propertyList = convertedProperties.length > 0
      ? isRenderObjectMemberTitlesEnabled(ctx, "tableOfContents")
        ? [translate("property", { capitalize: true, count: convertedProperties.length }), createListNode(...convertedProperties)]
        : [createListNode(...convertedProperties)]
      : [];

    const methodList = convertedMethods.length > 0
      ? isRenderObjectMemberTitlesEnabled(ctx, "tableOfContents")
        ? [translate("method", { capitalize: true, count: convertedMethods.length }), createListNode(...convertedMethods)]
        : [createListNode(...convertedMethods)]
      : [];

    const setterList = convertedSetters.length > 0
      ? isRenderObjectMemberTitlesEnabled(ctx, "tableOfContents")
        ? [translate("setter", { capitalize: true, count: convertedSetters.length }), createListNode(...convertedSetters)]
        : [createListNode(...convertedSetters)]
      : [];

    const getterList = convertedGetters.length > 0
      ? isRenderObjectMemberTitlesEnabled(ctx, "tableOfContents")
        ? [translate("getter", { capitalize: true, count: convertedGetters.length }), createListNode(...convertedGetters)]
        : [createListNode(...convertedGetters)]
      : [];

    const eventPropertyList = convertedEventProperties.length > 0
      ? isRenderObjectMemberTitlesEnabled(ctx, "tableOfContents")
        ? [translate("event", { capitalize: true, count: convertedEventProperties.length }), createListNode(...convertedEventProperties)]
        : [createListNode(...convertedEventProperties)]
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

  });

}


export function convertClassEntityForDocumentation(ctx: MarkupRenderContext, classEntity: ClassEntity): ConvertedClassEntityForDocumentation {

  const renderConfig = getRenderConfig(ctx);
  const translate = getTranslator(ctx);

  const name = classEntity.name;
  const symbolId = classEntity.symbolId;
  const typeId = classEntity.typeId;

  const entityPrefix = renderEntityPrefix(ctx, "documentation", classEntity.kind);
  const nameWithContext = renderMemberContext(ctx, "documentation", name);

  const prefixedDocumentationName = entityPrefix
    ? `${entityPrefix}: ${nameWithContext}`
    : nameWithContext;

  const anchor = registerAnchor(ctx, prefixedDocumentationName, symbolId);

  return withMemberContext(ctx, classEntity.name, ctx => {

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
    const constructSignaturesAnchor = isRenderObjectMemberTitlesEnabled(ctx, "documentation") && hasConstructSignatures && registerAnonymousAnchor(ctx, constructSignaturesTranslation);

    const hasProperties = publicPropertyEntities.length > 0;
    const propertiesTranslation = translate("property", { capitalizeEach: true, count: publicPropertyEntities.length });
    const propertiesAnchor = isRenderObjectMemberTitlesEnabled(ctx, "documentation") && hasProperties && registerAnonymousAnchor(ctx, propertiesTranslation);

    const hasMethods = publicMethodEntities.length > 0;
    const methodsTranslation = translate("method", { capitalizeEach: true, count: publicMethodEntities.length });
    const methodsAnchor = isRenderObjectMemberTitlesEnabled(ctx, "documentation") && hasMethods && registerAnonymousAnchor(ctx, methodsTranslation);

    const hasSetters = publicSetterEntities.length > 0;
    const settersTranslation = translate("setter", { capitalizeEach: true, count: publicSetterEntities.length });
    const settersAnchor = isRenderObjectMemberTitlesEnabled(ctx, "documentation") && hasSetters && registerAnonymousAnchor(ctx, settersTranslation);

    const hasGetters = publicGetterEntities.length > 0;
    const gettersTranslation = translate("getter", { capitalizeEach: true, count: publicGetterEntities.length });
    const gettersAnchor = isRenderObjectMemberTitlesEnabled(ctx, "documentation") && hasGetters && registerAnonymousAnchor(ctx, gettersTranslation);

    const hasEventProperties = publicEventPropertyEntities.length > 0;
    const eventPropertiesTranslation = translate("event", { capitalizeEach: true, count: publicEventPropertyEntities.length });
    const eventPropertiesAnchor = isRenderObjectMemberTitlesEnabled(ctx, "documentation") && hasEventProperties && registerAnonymousAnchor(ctx, eventPropertiesTranslation);

    const convertedConstructSignatures = explicitConstructSignatures?.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity)) ?? [];
    const convertedProperties = publicPropertyEntities.map(propertyEntity => convertPropertyEntityForDocumentation(ctx, propertyEntity));
    const convertedMethods = publicMethodEntities.flatMap(methodEntity => convertFunctionLikeEntityForDocumentation(ctx, methodEntity));
    const convertedSetters = publicSetterEntities.flatMap(setterEntity => convertFunctionLikeEntityForDocumentation(ctx, setterEntity));
    const convertedGetters = publicGetterEntities.flatMap(getterEntity => convertFunctionLikeEntityForDocumentation(ctx, getterEntity));
    const convertedEventProperties = publicEventPropertyEntities.map(eventPropertyEntity => convertEventPropertyEntityForDocumentation(ctx, eventPropertyEntity));

    const constructSignaturesTitle = constructSignaturesAnchor && createTitleNode(constructSignaturesTranslation, constructSignaturesAnchor, ...convertedConstructSignatures);
    const propertiesTitle = propertiesAnchor && createTitleNode(propertiesTranslation, propertiesAnchor, ...convertedProperties);
    const methodsTitle = methodsAnchor && createTitleNode(methodsTranslation, methodsAnchor, ...convertedMethods);
    const settersTitle = settersAnchor && createTitleNode(settersTranslation, settersAnchor, ...convertedSetters);
    const gettersTitle = gettersAnchor && createTitleNode(gettersTranslation, gettersAnchor, ...convertedGetters);
    const eventPropertiesTitle = eventPropertiesAnchor && createTitleNode(eventPropertiesTranslation, eventPropertiesAnchor, ...convertedEventProperties);

    const constructSignatures = hasConstructSignatures && createSectionNode("constructor", ...constructSignaturesTitle ? [constructSignaturesTitle] as const : convertedConstructSignatures);
    const properties = hasProperties && createSectionNode("properties", ...propertiesTitle ? [propertiesTitle] as const : convertedProperties);
    const methods = hasMethods && createSectionNode("methods", ...methodsTitle ? [methodsTitle] as const : convertedMethods);
    const setters = hasSetters && createSectionNode("setters", ...settersTitle ? [settersTitle] as const : convertedSetters);
    const getters = hasGetters && createSectionNode("getters", ...gettersTitle ? [gettersTitle] as const : convertedGetters);
    const eventProperties = hasEventProperties && createSectionNode("events", ...eventPropertiesTitle ? [eventPropertiesTitle] as const : convertedEventProperties);

    return createSectionNode(
      getSectionType(classEntity.kind),
      createTitleNode(
        prefixedDocumentationName,
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

  });

}
