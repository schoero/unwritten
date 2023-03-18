import {
  convertPropertyEntityForDocumentation,
  convertSignatureEntityForDocumentation
} from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { convertJSDocTags } from "unwritten:renderer/markup/ast-converter/shared/jsdoc-tags.js";
import { convertPosition } from "unwritten:renderer/markup/ast-converter/shared/position.js";
import {
  createLinkNode,
  createParagraphNode,
  createSmallNode,
  createTitleNode
} from "unwritten:renderer/markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";
import {
  extendInterfaceEntityPropertiesWithHeritage,
  extendInterfaceEntitySignaturesWithHeritage
} from "unwritten:renderer/utils/heritage.js";

import type { InterfaceEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type {
  ConvertedInterfaceEntityForDocumentation,
  ConvertedInterfaceEntityForTableOfContents
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertInterfaceEntityForTableOfContents(ctx: MarkupRenderContexts, interfaceEntity: InterfaceEntity): ConvertedInterfaceEntityForTableOfContents {
  return createLinkNode(interfaceEntity.name, interfaceEntity.id);
}


export function convertInterfaceEntityForDocumentation(ctx: MarkupRenderContexts, interfaceEntity: InterfaceEntity): ConvertedInterfaceEntityForDocumentation {

  const translate = getTranslator(ctx);

  const name = interfaceEntity.name;
  const description = interfaceEntity.description ?? "";
  const example = interfaceEntity.example ?? "";
  const remarks = interfaceEntity.remarks ?? "";

  const position = interfaceEntity.position ? convertPosition(ctx, interfaceEntity.position) : "";
  const jsdocTags = convertJSDocTags(ctx, interfaceEntity);

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

  return createTitleNode(
    name,
    interfaceEntity.id,
    [
      createSmallNode(position),
      createParagraphNode(jsdocTags),
      createParagraphNode(description),
      createParagraphNode(remarks),
      createParagraphNode(example),
      createTitleNode(translate("construct-signature", { count: 99 }), undefined, convertedConstructSignatures),
      createTitleNode(translate("call-signature", { count: 99 }), undefined, convertedCallSignatures),
      createTitleNode(translate("property", { count: 99 }), undefined, convertedProperties),
      createTitleNode(translate("method", { count: 99 }), undefined, convertedMethods),
      createTitleNode(translate("setter", { count: 99 }), undefined, convertedSetters),
      createTitleNode(translate("getter", { count: 99 }), undefined, convertedGetters)
    ]
  );

}
