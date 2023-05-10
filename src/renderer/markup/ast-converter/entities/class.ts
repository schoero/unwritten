import { convertDescription } from "unwritten:renderer/markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer/markup/ast-converter/shared/example.js";
import { convertPosition } from "unwritten:renderer/markup/ast-converter/shared/position.js";
import { convertRemarks } from "unwritten:renderer/markup/ast-converter/shared/remarks.js";
import { convertTags } from "unwritten:renderer/markup/ast-converter/shared/tags.js";
import { registerAnchor } from "unwritten:renderer/markup/utils/linker.js";
import {
  convertFunctionLikeEntityForDocumentation,
  convertPropertyEntityForDocumentation,
  convertSignatureEntityForDocumentation
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { createAnchorNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
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
  const name = classEntity.name;
  const id = classEntity.symbolId;
  return createAnchorNode(name, id);
}


export function convertClassEntityForDocumentation(ctx: MarkupRenderContexts, classEntity: ClassEntity): ConvertedClassEntityForDocumentation {

  const t = getTranslator(ctx);

  const name = classEntity.name;
  const id = classEntity.symbolId;

  const anchor = registerAnchor(ctx, name, id);

  const convertedPosition = convertPosition(ctx, classEntity.position);
  const convertedTags = convertTags(ctx, classEntity);
  const convertedDescription = convertDescription(ctx, classEntity.description);
  const convertedExample = convertExample(ctx, classEntity.example);
  const convertedRemarks = convertRemarks(ctx, classEntity.remarks);

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
    anchor,
    convertedPosition,
    convertedTags,
    convertedDescription,
    convertedRemarks,
    convertedExample,
    createTitleNode(t("construct-signature", { count: convertedConstructSignatures?.length }), convertedConstructSignatures),
    createTitleNode(t("property", { count: convertedProperties.length }), convertedProperties),
    createTitleNode(t("method", { count: convertedMethods.length }), convertedMethods),
    createTitleNode(t("setter", { count: convertedSetters.length }), convertedSetters),
    createTitleNode(t("getter", { count: convertedGetters.length }), convertedGetters)
  );

}
