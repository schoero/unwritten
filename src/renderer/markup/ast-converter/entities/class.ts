import {
  convertFunctionLikeEntityForDocumentation,
  convertPropertyEntityForDocumentation,
  convertSignatureEntityForDocumentation
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { convertJSDocTags } from "unwritten:renderer:markup/ast-converter/shared/jsdoc-tags.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import {
  createLinkNode,
  createParagraphNode,
  createSmallNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";
import {
  extendClassEntityConstructorsWithHeritage,
  extendClassEntityEntitiesWithHeritage
} from "unwritten:renderer:utils/heritage.js";

import type { ClassEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedClassEntityForDocumentation,
  ConvertedClassEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertClassEntityForTableOfContents(ctx: MarkupRenderContexts, classEntity: ClassEntity): ConvertedClassEntityForTableOfContents {
  return createLinkNode(classEntity.name, classEntity.id);
}


export function convertClassEntityForDocumentation(ctx: MarkupRenderContexts, classEntity: ClassEntity): ConvertedClassEntityForDocumentation {

  const t = getTranslator(ctx);

  const name = classEntity.name;
  const description = classEntity.description ?? "";
  const example = classEntity.example ?? "";
  const remarks = classEntity.remarks ?? "";

  const position = classEntity.position ? convertPosition(ctx, classEntity.position) : "";
  const jsdocTags = convertJSDocTags(ctx, classEntity);

  const constructorEntity = extendClassEntityConstructorsWithHeritage(classEntity);
  const propertyEntities = extendClassEntityEntitiesWithHeritage(classEntity, "properties");
  const methodEntities = extendClassEntityEntitiesWithHeritage(classEntity, "methods");
  const setterEntities = extendClassEntityEntitiesWithHeritage(classEntity, "setters");
  const getterEntities = extendClassEntityEntitiesWithHeritage(classEntity, "getters");

  const convertedConstructSignatures = constructorEntity?.signatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedProperties = propertyEntities.map(propertyEntity => convertPropertyEntityForDocumentation(ctx, propertyEntity));
  const convertedMethods = methodEntities.map(methodEntity => convertFunctionLikeEntityForDocumentation(ctx, methodEntity));
  const convertedSetters = setterEntities.map(setterEntity => convertFunctionLikeEntityForDocumentation(ctx, setterEntity));
  const convertedGetters = getterEntities.map(getterEntity => convertFunctionLikeEntityForDocumentation(ctx, getterEntity));

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
      createTitleNode(t("property", { count: 99 }), undefined, convertedProperties),
      createTitleNode(t("method", { count: 99 }), undefined, convertedMethods),
      createTitleNode(t("setter", { count: 99 }), undefined, convertedSetters),
      createTitleNode(t("getter", { count: 99 }), undefined, convertedGetters)
    ]
  );

}
