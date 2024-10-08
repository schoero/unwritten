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
import { getSectionType } from "unwritten:renderer:markup/types-definitions/sections";
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
import { convertSeeTagsForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/see";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry";
import { renderMemberContext } from "unwritten:renderer/markup/utils/context";
import {
  implicitSignatureFilter,
  internalMemberFilter,
  internalSignatureFilter,
  privateMemberFilter,
  privateSignatureFilter
} from "unwritten:renderer/markup/utils/filter";
import { renderEntityPrefix } from "unwritten:renderer/markup/utils/renderer.js";
import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { InterfaceEntity, MergedInterfaceEntity } from "unwritten:interpreter:type-definitions/entities";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedInterfaceEntityForDocumentation,
  ConvertedInterfaceEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer";
import type { AnchorNode } from "unwritten:renderer/markup/types-definitions/nodes";


export function convertInterfaceEntityToAnchor(ctx: MarkupRenderContext, interfaceEntity: InterfaceEntity | MergedInterfaceEntity, displayName?: string): AnchorNode {

  const id = interfaceEntity.symbolId;
  const name = interfaceEntity.name;

  const documentationEntityPrefix = renderEntityPrefix(ctx, "documentation", interfaceEntity.kind);
  const documentationName = renderMemberContext(ctx, "documentation", name);

  const tableOfContentsName = renderMemberContext(ctx, "tableOfContents", name);
  const tableOfContentsEntityPrefix = renderEntityPrefix(ctx, "tableOfContents", interfaceEntity.kind);

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

export function convertInterfaceEntityForTableOfContents(ctx: MarkupRenderContext, interfaceEntity: InterfaceEntity | MergedInterfaceEntity): ConvertedInterfaceEntityForTableOfContents {
  return convertInterfaceEntityToAnchor(ctx, interfaceEntity);
}

export function convertInterfaceEntityForDocumentation(ctx: MarkupRenderContext, interfaceEntity: InterfaceEntity | MergedInterfaceEntity): ConvertedInterfaceEntityForDocumentation {

  const renderConfig = getRenderConfig(ctx);

  const name = interfaceEntity.name;
  const symbolId = interfaceEntity.symbolId;

  const entityPrefix = renderEntityPrefix(ctx, "documentation", interfaceEntity.kind);
  const nameWithContext = renderMemberContext(ctx, "documentation", name);

  const prefixedDocumentationName = entityPrefix
    ? `${entityPrefix}: ${nameWithContext}`
    : nameWithContext;

  const anchor = registerAnchor(ctx, prefixedDocumentationName, symbolId);

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

  const publicPropertyEntities = propertyEntities.filter(privateMemberFilter, ctx).filter(internalMemberFilter, ctx);
  const publicEventPropertyEntities = eventPropertyEntities.filter(privateMemberFilter, ctx).filter(internalMemberFilter, ctx);
  const publicConstructSignatures = constructSignatureEntities.filter(privateSignatureFilter, ctx).filter(internalSignatureFilter, ctx);
  const publicCallSignatures = callSignatureEntities.filter(privateSignatureFilter, ctx).filter(internalSignatureFilter, ctx);
  const publicMethodSignatures = methodSignatures.filter(privateSignatureFilter, ctx).filter(internalSignatureFilter, ctx);
  const publicSetterSignatures = setterSignatures.filter(privateSignatureFilter, ctx).filter(internalSignatureFilter, ctx);
  const publicGetterSignatures = getterSignatures.filter(privateSignatureFilter, ctx).filter(internalSignatureFilter, ctx);

  const explicitConstructSignatures = publicConstructSignatures.filter(implicitSignatureFilter);
  const explicitCallSignatures = publicCallSignatures.filter(implicitSignatureFilter);
  const explicitMethodSignatures = publicMethodSignatures.filter(implicitSignatureFilter);
  const explicitSetterSignatures = publicSetterSignatures.filter(implicitSignatureFilter);
  const explicitGetterSignatures = publicGetterSignatures.filter(implicitSignatureFilter);

  const properties = publicPropertyEntities.map(propertyEntity => convertPropertyEntityForType(ctx, propertyEntity));
  const eventProperties = publicEventPropertyEntities.map(eventPropertyEntity => convertEventPropertyEntityForType(ctx, eventPropertyEntity));
  const constructSignatures = explicitConstructSignatures.map(signatureEntity => convertSignatureEntityForType(ctx, signatureEntity));
  const callSignatures = explicitCallSignatures.map(signatureEntity => convertSignatureEntityForType(ctx, signatureEntity));
  const methods = explicitMethodSignatures.map(signatureEntity => convertSignatureEntityForType(ctx, signatureEntity));
  const setters = explicitSetterSignatures.map(signatureEntity => convertSignatureEntityForType(ctx, signatureEntity));
  const getters = explicitGetterSignatures.map(signatureEntity => convertSignatureEntityForType(ctx, signatureEntity));

  return createSectionNode(
    getSectionType(interfaceEntity.kind),
    createTitleNode(
      prefixedDocumentationName,
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
