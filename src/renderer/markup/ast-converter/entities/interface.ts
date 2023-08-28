import { registerAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import {
  filterImplicitSignatures,
  filterPrivateMembers,
  filterPrivateSignatures
} from "unwritten:renderer/utils/private-members.js";
import {
  convertEventPropertyEntityForType,
  convertPropertyEntityForType,
  convertSignatureEntityForType,
  convertTypeParameterEntitiesForDocumentation
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

  const name = interfaceEntity.name;
  const symbolId = interfaceEntity.symbolId;

  const anchor = registerAnchor(ctx, name, symbolId);

  const tags = convertTagsForDocumentation(ctx, interfaceEntity);
  const description = convertDescriptionForDocumentation(ctx, interfaceEntity.description);
  const remarks = convertRemarksForDocumentation(ctx, interfaceEntity.remarks);
  const examples = convertExamplesForDocumentation(ctx, interfaceEntity.example);
  const position = convertPositionForDocumentation(ctx, interfaceEntity.position);
  const typeParameters = convertTypeParameterEntitiesForDocumentation(ctx, interfaceEntity.typeParameters);

  const propertyEntities = extendInterfaceEntityPropertiesWithHeritage(interfaceEntity, "properties");
  const eventPropertyEntities = extendInterfaceEntityPropertiesWithHeritage(interfaceEntity, "events");
  const constructSignatureEntities = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "constructSignatures");
  const callSignatureEntities = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "callSignatures");
  const methodSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "methodSignatures");
  const setterSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "setterSignatures");
  const getterSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "getterSignatures");

  const publicPropertyEntities = renderConfig.renderPrivateMembers ? propertyEntities : filterPrivateMembers(propertyEntities);
  const publicEventPropertyEntities = renderConfig.renderPrivateMembers ? eventPropertyEntities : filterPrivateMembers(eventPropertyEntities);
  const publicConstructSignatures = renderConfig.renderPrivateMembers ? constructSignatureEntities : filterPrivateSignatures(constructSignatureEntities);
  const publicCallSignatures = renderConfig.renderPrivateMembers ? callSignatureEntities : filterPrivateSignatures(callSignatureEntities);
  const publicMethodSignatures = renderConfig.renderPrivateMembers ? methodSignatures : filterPrivateSignatures(methodSignatures);
  const publicSetterSignatures = renderConfig.renderPrivateMembers ? setterSignatures : filterPrivateSignatures(setterSignatures);
  const publicGetterSignatures = renderConfig.renderPrivateMembers ? getterSignatures : filterPrivateSignatures(getterSignatures);

  const explicitConstructSignatures = filterImplicitSignatures(publicConstructSignatures);
  const explicitCallSignatures = filterImplicitSignatures(publicCallSignatures);
  const explicitMethodSignatures = filterImplicitSignatures(publicMethodSignatures);
  const explicitSetterSignatures = filterImplicitSignatures(publicSetterSignatures);
  const explicitGetterSignatures = filterImplicitSignatures(publicGetterSignatures);

  const properties = publicPropertyEntities.map(propertyEntity => convertPropertyEntityForType(ctx, propertyEntity));
  const eventProperties = publicEventPropertyEntities.map(eventPropertyEntity => convertEventPropertyEntityForType(ctx, eventPropertyEntity));
  const constructSignatures = explicitConstructSignatures.map(signatureEntity => convertSignatureEntityForType(ctx, signatureEntity));
  const callSignatures = explicitCallSignatures.map(signatureEntity => convertSignatureEntityForType(ctx, signatureEntity));
  const methods = explicitMethodSignatures.map(signatureEntity => convertSignatureEntityForType(ctx, signatureEntity));
  const setters = explicitSetterSignatures.map(signatureEntity => convertSignatureEntityForType(ctx, signatureEntity));
  const getters = explicitGetterSignatures.map(signatureEntity => convertSignatureEntityForType(ctx, signatureEntity));

  return createSectionNode(
    SECTION_TYPE[interfaceEntity.kind],
    createTitleNode(
      name,
      anchor,
      tags,
      position,
      typeParameters,
      description,
      remarks,
      examples,
      createListNode(...constructSignatures),
      createListNode(...callSignatures),
      createListNode(...properties),
      createListNode(...methods),
      createListNode(...setters),
      createListNode(...getters),
      createListNode(...eventProperties)
    )
  );

}
