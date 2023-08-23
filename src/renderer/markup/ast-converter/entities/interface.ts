import { registerAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import {
  filterImplicitSignatures,
  filterPrivateMembers,
  filterPrivateSignatures
} from "unwritten:renderer/utils/private-members.js";
import {
  convertEventPropertyEntityForDocumentation,
  convertPropertyEntityForDocumentation,
  convertSignatureEntityForDocumentation
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { convertDescriptionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer:markup/ast-converter/shared/example.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { convertRemarks } from "unwritten:renderer:markup/ast-converter/shared/remarks.js";
import { convertTagsForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/tags.js";
import { SECTION_TYPE } from "unwritten:renderer:markup/types-definitions/sections.js";
import { createAnchorNode, createSectionNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";
import {
  extendInterfaceEntityPropertiesWithHeritage,
  extendInterfaceEntitySignaturesWithHeritage
} from "unwritten:renderer:utils/heritage.js";

import type { InterfaceEntity, MergedInterfaceEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedInterfaceEntityForDocumentation,
  ConvertedInterfaceEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertInterfaceEntityForTableOfContents(ctx: MarkupRenderContexts, interfaceEntity: InterfaceEntity | MergedInterfaceEntity): ConvertedInterfaceEntityForTableOfContents {
  const name = interfaceEntity.name;
  const id = interfaceEntity.symbolId;
  return createAnchorNode(name, id);
}


export function convertInterfaceEntityForDocumentation(ctx: MarkupRenderContexts, interfaceEntity: InterfaceEntity | MergedInterfaceEntity): ConvertedInterfaceEntityForDocumentation {

  const renderConfig = getRenderConfig(ctx);
  const translate = getTranslator(ctx);

  const name = interfaceEntity.name;
  const symbolId = interfaceEntity.symbolId;

  const anchor = registerAnchor(ctx, name, symbolId);

  const convertedTags = convertTagsForDocumentation(ctx, interfaceEntity);
  const convertedDescription = convertDescriptionForDocumentation(ctx, interfaceEntity.description);
  const convertedRemarks = convertRemarks(ctx, interfaceEntity.remarks);
  const convertedExample = convertExample(ctx, interfaceEntity.example);
  const convertedPosition = convertPosition(ctx, interfaceEntity.position);

  const propertyEntities = extendInterfaceEntityPropertiesWithHeritage(interfaceEntity, "properties");
  const eventPropertyEntities = extendInterfaceEntityPropertiesWithHeritage(interfaceEntity, "events");
  const constructSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "constructSignatures");
  const callSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "callSignatures");
  const methodSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "methodSignatures");
  const setterSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "setterSignatures");
  const getterSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "getterSignatures");

  const publicPropertyEntities = renderConfig.renderPrivateMembers ? propertyEntities : filterPrivateMembers(propertyEntities);
  const publicEventPropertyEntities = renderConfig.renderPrivateMembers ? eventPropertyEntities : filterPrivateMembers(eventPropertyEntities);
  const publicConstructSignatures = renderConfig.renderPrivateMembers ? constructSignatures : filterPrivateSignatures(constructSignatures);
  const publicCallSignatures = renderConfig.renderPrivateMembers ? callSignatures : filterPrivateSignatures(callSignatures);
  const publicMethodSignatures = renderConfig.renderPrivateMembers ? methodSignatures : filterPrivateSignatures(methodSignatures);
  const publicSetterSignatures = renderConfig.renderPrivateMembers ? setterSignatures : filterPrivateSignatures(setterSignatures);
  const publicGetterSignatures = renderConfig.renderPrivateMembers ? getterSignatures : filterPrivateSignatures(getterSignatures);

  const explicitConstructSignatures = filterImplicitSignatures(publicConstructSignatures);
  const explicitCallSignatures = filterImplicitSignatures(publicCallSignatures);
  const explicitMethodSignatures = filterImplicitSignatures(publicMethodSignatures);
  const explicitSetterSignatures = filterImplicitSignatures(publicSetterSignatures);
  const explicitGetterSignatures = filterImplicitSignatures(publicGetterSignatures);

  const convertedProperties = publicPropertyEntities.map(propertyEntity => convertPropertyEntityForDocumentation(ctx, propertyEntity));
  const convertedEventProperties = publicEventPropertyEntities.map(eventPropertyEntity => convertEventPropertyEntityForDocumentation(ctx, eventPropertyEntity));
  const convertedConstructSignatures = explicitConstructSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedCallSignatures = explicitCallSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedMethods = explicitMethodSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedSetters = explicitSetterSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedGetters = explicitGetterSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));

  return createSectionNode(
    SECTION_TYPE[interfaceEntity.kind],
    createTitleNode(
      name,
      anchor,
      convertedPosition,
      convertedTags,
      convertedDescription,
      convertedRemarks,
      convertedExample,
      createTitleNode(translate("constructSignature", { capitalizeEach: true, count: convertedConstructSignatures.length }), ...convertedConstructSignatures),
      createTitleNode(translate("callSignature", { capitalize: true, count: convertedCallSignatures.length }), ...convertedCallSignatures),
      createTitleNode(translate("property", { capitalize: true, count: convertedProperties.length }), ...convertedProperties),
      createTitleNode(translate("method", { capitalize: true, count: convertedMethods.length }), ...convertedMethods),
      createTitleNode(translate("setter", { capitalize: true, count: convertedSetters.length }), ...convertedSetters),
      createTitleNode(translate("getter", { capitalize: true, count: convertedGetters.length }), ...convertedGetters),
      createTitleNode(translate("event", { capitalize: true, count: convertedEventProperties.length }), ...convertedEventProperties)
    )
  );

}
