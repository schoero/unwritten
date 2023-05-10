import { convertDescription } from "unwritten:renderer/markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer/markup/ast-converter/shared/example.js";
import { convertRemarks } from "unwritten:renderer/markup/ast-converter/shared/remarks.js";
import { convertTags } from "unwritten:renderer/markup/ast-converter/shared/tags.js";
import { registerAnchor } from "unwritten:renderer/markup/utils/linker.js";
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

  const translate = getTranslator(ctx);

  const name = interfaceEntity.name;
  const id = interfaceEntity.symbolId;

  const anchor = registerAnchor(ctx, name, id);

  const convertedTags = convertTags(ctx, interfaceEntity);
  const convertedDescription = convertDescription(ctx, interfaceEntity.description);
  const convertedRemarks = convertRemarks(ctx, interfaceEntity.remarks);
  const convertedExample = convertExample(ctx, interfaceEntity.example);
  const convertedPosition = convertPosition(ctx, interfaceEntity.position);

  const properties = extendInterfaceEntityPropertiesWithHeritage(interfaceEntity);
  const constructSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "constructSignatures");
  const callSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "callSignatures");
  const methodSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "methodSignatures");
  const setterSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "setterSignatures");
  const getterSignatures = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity, "getterSignatures");

  const convertedProperties = properties.map(propertyEntity => convertPropertyEntityForDocumentation(ctx, propertyEntity));
  const convertedConstructSignatures = constructSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedCallSignatures = callSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedSetters = setterSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedGetters = getterSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedMethods = methodSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));

  return createSectionNode(
    interfaceEntity.kind,
    createTitleNode(
      name,
      anchor,
      convertedPosition,
      convertedTags,
      convertedDescription,
      convertedRemarks,
      convertedExample,
      createTitleNode(translate("construct-signature", { count: convertedConstructSignatures.length }), ...convertedConstructSignatures),
      createTitleNode(translate("call-signature", { count: convertedCallSignatures.length }), ...convertedCallSignatures),
      createTitleNode(translate("property", { count: convertedProperties.length }), ...convertedProperties),
      createTitleNode(translate("method", { count: convertedMethods.length }), ...convertedMethods),
      createTitleNode(translate("setter", { count: convertedSetters.length }), ...convertedSetters),
      createTitleNode(translate("getter", { count: convertedGetters.length }), ...convertedGetters)
    )
  );

}
