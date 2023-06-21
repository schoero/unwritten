import { convertDescriptionForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer/markup/ast-converter/shared/example.js";
import { convertRemarks } from "unwritten:renderer/markup/ast-converter/shared/remarks.js";
import { convertTagsForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/tags.js";
import { SECTION_TYPE } from "unwritten:renderer/markup/enums/sections.js";
import { registerAnchor } from "unwritten:renderer/markup/utils/linker.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { filterPrivateMembers, filterPrivateSignatures } from "unwritten:renderer/utils/private-members.js";
import {
  convertPropertyEntityForDocumentation,
  convertSignatureEntityForDocumentation
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { createAnchorNode, createSectionNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";
import {
  extendInterfaceEntityPropertiesWithHeritage,
  extendInterfaceEntitySignaturesWithHeritage
} from "unwritten:renderer:utils/heritage.js";

import type { InterfaceEntity, MergedInterfaceEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
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
  const id = interfaceEntity.symbolId;

  const anchor = registerAnchor(ctx, name, id);

  const convertedTags = convertTagsForDocumentation(ctx, interfaceEntity);
  const convertedDescription = convertDescriptionForDocumentation(ctx, interfaceEntity.description);
  const convertedRemarks = convertRemarks(ctx, interfaceEntity.remarks);
  const convertedExample = convertExample(ctx, interfaceEntity.example);
  const convertedPosition = convertPosition(ctx, interfaceEntity.position);

  const propertyEntities = extendInterfaceEntityPropertiesWithHeritage(interfaceEntity);
  const constructSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "constructSignatures");
  const callSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "callSignatures");
  const methodSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "methodSignatures");
  const setterSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "setterSignatures");
  const getterSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "getterSignatures");

  const publicPropertyEntities = renderConfig.renderPrivateMembers ? propertyEntities : filterPrivateMembers(propertyEntities);
  const publicConstructorEntity = renderConfig.renderPrivateMembers ? constructSignatures : filterPrivateSignatures(constructSignatures);
  const publicCallSignatures = renderConfig.renderPrivateMembers ? callSignatures : filterPrivateSignatures(callSignatures);
  const publicMethodSignatures = renderConfig.renderPrivateMembers ? methodSignatures : filterPrivateSignatures(methodSignatures);
  const publicSetterSignatures = renderConfig.renderPrivateMembers ? setterSignatures : filterPrivateSignatures(setterSignatures);
  const publicGetterSignatures = renderConfig.renderPrivateMembers ? getterSignatures : filterPrivateSignatures(getterSignatures);

  const convertedProperties = publicPropertyEntities.map(propertyEntity => convertPropertyEntityForDocumentation(ctx, propertyEntity));
  const convertedConstructSignatures = publicConstructorEntity.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedCallSignatures = publicCallSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedMethods = publicMethodSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedSetters = publicSetterSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedGetters = publicGetterSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));

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
      createTitleNode(translate("construct-signature", { capitalizeEach: true, count: convertedConstructSignatures.length }), ...convertedConstructSignatures),
      createTitleNode(translate("call-signature", { capitalize: true, count: convertedCallSignatures.length }), ...convertedCallSignatures),
      createTitleNode(translate("property", { capitalize: true, count: convertedProperties.length }), ...convertedProperties),
      createTitleNode(translate("method", { capitalize: true, count: convertedMethods.length }), ...convertedMethods),
      createTitleNode(translate("setter", { capitalize: true, count: convertedSetters.length }), ...convertedSetters),
      createTitleNode(translate("getter", { capitalize: true, count: convertedGetters.length }), ...convertedGetters)
    )
  );

}
