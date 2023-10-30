import { convertSeeTagsForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/see";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry";
import { renderMemberContext } from "unwritten:renderer/markup/utils/context";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import {
  filterOutImplicitSignatures,
  filterOutPrivateMembers,
  filterOutPrivateSignatures
} from "unwritten:renderer/utils/private-members";
import {
  convertEventPropertyEntityForType,
  convertPropertyEntityForType,
  convertSignatureEntityForType,
  convertTypeParameterEntitiesForDocumentation
} from "unwritten:renderer:markup/ast-converter/entities/index";
import { convertDescriptionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/description";
import { convertExamplesForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/example";
import { convertPositionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/position";
import { convertRemarksForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/remarks";
import { convertTagsForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/tags";
import { SECTION_TYPE } from "unwritten:renderer:markup/types-definitions/sections";
import {
  createAnchorNode,
  createListNode,
  createSectionNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes";
import {
  extendInterfaceEntityPropertiesWithHeritage,
  extendInterfaceEntitySignaturesWithHeritage
} from "unwritten:renderer:utils/heritage";

import type { InterfaceEntity, MergedInterfaceEntity } from "unwritten:interpreter/type-definitions/entities";
import type { AnchorNode } from "unwritten:renderer/markup/types-definitions/nodes";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedInterfaceEntityForDocumentation,
  ConvertedInterfaceEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertInterfaceEntityToAnchor(ctx: MarkupRenderContexts, interfaceEntity: InterfaceEntity | MergedInterfaceEntity, displayName?: string): AnchorNode {

  const id = interfaceEntity.symbolId;
  const name = interfaceEntity.name;
  const documentationName = renderMemberContext(ctx, "documentation", name);
  const tableOfContentsName = renderMemberContext(ctx, "tableOfContents", name);

  displayName ??= tableOfContentsName;

  return createAnchorNode(
    documentationName,
    id,
    displayName
  );

}

export function convertInterfaceEntityForTableOfContents(ctx: MarkupRenderContexts, interfaceEntity: InterfaceEntity | MergedInterfaceEntity): ConvertedInterfaceEntityForTableOfContents {
  return convertInterfaceEntityToAnchor(ctx, interfaceEntity);
}

export function convertInterfaceEntityForDocumentation(ctx: MarkupRenderContexts, interfaceEntity: InterfaceEntity | MergedInterfaceEntity): ConvertedInterfaceEntityForDocumentation {

  const renderConfig = getRenderConfig(ctx);

  const name = interfaceEntity.name;
  const symbolId = interfaceEntity.symbolId;

  const nameWithContext = renderMemberContext(ctx, "documentation", name);
  const anchor = registerAnchor(ctx, nameWithContext, symbolId);

  const position = convertPositionForDocumentation(ctx, interfaceEntity.position);
  const tags = convertTagsForDocumentation(ctx, interfaceEntity);
  const typeParameters = convertTypeParameterEntitiesForDocumentation(ctx, interfaceEntity.typeParameters);

  const description = interfaceEntity.description && convertDescriptionForDocumentation(ctx, interfaceEntity.description);
  const remarks = interfaceEntity.remarks && convertRemarksForDocumentation(ctx, interfaceEntity.remarks);
  const examples = interfaceEntity.example && convertExamplesForDocumentation(ctx, interfaceEntity.example);
  const see = interfaceEntity.see && convertSeeTagsForDocumentation(ctx, interfaceEntity.see);

  const propertyEntities = extendInterfaceEntityPropertiesWithHeritage(interfaceEntity, "properties");
  const eventPropertyEntities = extendInterfaceEntityPropertiesWithHeritage(interfaceEntity, "events");
  const constructSignatureEntities = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "constructSignatures");
  const callSignatureEntities = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "callSignatures");
  const methodSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "methodSignatures");
  const setterSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "setterSignatures");
  const getterSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "getterSignatures");

  const publicPropertyEntities = renderConfig.renderPrivateMembers ? propertyEntities : filterOutPrivateMembers(propertyEntities);
  const publicEventPropertyEntities = renderConfig.renderPrivateMembers ? eventPropertyEntities : filterOutPrivateMembers(eventPropertyEntities);
  const publicConstructSignatures = renderConfig.renderPrivateMembers ? constructSignatureEntities : filterOutPrivateSignatures(constructSignatureEntities);
  const publicCallSignatures = renderConfig.renderPrivateMembers ? callSignatureEntities : filterOutPrivateSignatures(callSignatureEntities);
  const publicMethodSignatures = renderConfig.renderPrivateMembers ? methodSignatures : filterOutPrivateSignatures(methodSignatures);
  const publicSetterSignatures = renderConfig.renderPrivateMembers ? setterSignatures : filterOutPrivateSignatures(setterSignatures);
  const publicGetterSignatures = renderConfig.renderPrivateMembers ? getterSignatures : filterOutPrivateSignatures(getterSignatures);

  const explicitConstructSignatures = filterOutImplicitSignatures(publicConstructSignatures);
  const explicitCallSignatures = filterOutImplicitSignatures(publicCallSignatures);
  const explicitMethodSignatures = filterOutImplicitSignatures(publicMethodSignatures);
  const explicitSetterSignatures = filterOutImplicitSignatures(publicSetterSignatures);
  const explicitGetterSignatures = filterOutImplicitSignatures(publicGetterSignatures);

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
      nameWithContext,
      anchor,
      tags,
      position,
      typeParameters,
      description,
      remarks,
      examples,
      see,
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
