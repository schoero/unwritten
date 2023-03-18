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
import { useTranslation } from "unwritten:renderer/markup/utils/translations.js";
import {
  extendInterfaceEntityPropertiesWithHeritage,
  extendInterfaceEntitySignaturesWithHeritage
} from "unwritten:renderer/utils/heritage.js";

import type { ClassEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type {
  ConvertedClassEntityForDocumentation,
  ConvertedClassEntityForTableOfContents
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertClassEntityForTableOfContents(ctx: MarkupRenderContexts, classEntity: ClassEntity): ConvertedClassEntityForTableOfContents {
  return createLinkNode(classEntity.name, classEntity.id);
}


export function convertClassEntityForDocumentation(ctx: MarkupRenderContexts, classEntity: ClassEntity): ConvertedClassEntityForDocumentation {

  const t = useTranslation(ctx);

  const name = classEntity.name;
  const description = classEntity.description ?? "";
  const example = classEntity.example ?? "";
  const remarks = classEntity.remarks ?? "";

  const position = classEntity.position ? convertPosition(ctx, classEntity.position) : "";
  const jsdocTags = convertJSDocTags(ctx, classEntity);

  const properties = extendInterfaceEntityPropertiesWithHeritage(classEntity);
  const constructSignatures = extendInterfaceEntitySignaturesWithHeritage(classEntity, "constructSignatures");
  const callSignatures = extendInterfaceEntitySignaturesWithHeritage(classEntity, "callSignatures");
  const methodSignatures = extendInterfaceEntitySignaturesWithHeritage(classEntity, "methodSignatures");
  const setterSignatures = extendInterfaceEntitySignaturesWithHeritage(classEntity, "setterSignatures");
  const getterSignatures = extendInterfaceEntitySignaturesWithHeritage(classEntity, "getterSignatures");

  const convertedProperties = properties.map(propertyEntity => convertPropertyEntityForDocumentation(ctx, propertyEntity));
  const convertedConstructSignatures = constructSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedCallSignatures = callSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedSetters = setterSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedGetters = getterSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedMethods = methodSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));

  return createTitleNode(
    name,
    classEntity.id,
    [
      createSmallNode(position),
      createParagraphNode(jsdocTags),
      createParagraphNode(description),
      createParagraphNode(remarks),
      createParagraphNode(example),
      createTitleNode(t("construct-signature", { count: 99 }), undefined, convertedConstructSignatures),
      createTitleNode(t("call-signature", { count: 99 }), undefined, convertedCallSignatures),
      createTitleNode(t("property", { count: 99 }), undefined, convertedProperties),
      createTitleNode(t("method", { count: 99 }), undefined, convertedMethods),
      createTitleNode(t("setter", { count: 99 }), undefined, convertedSetters),
      createTitleNode(t("getter", { count: 99 }), undefined, convertedGetters)
    ]
  );

}
