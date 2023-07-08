import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { filterPrivateMembers } from "unwritten:renderer/utils/private-members.js";
import {
  convertFunctionLikeEntityForDocumentation,
  convertFunctionLikeEntityForTableOfContents,
  convertPropertyEntityForDocumentation,
  convertPropertyEntityForTableOfContents,
  convertSignatureEntityForDocumentation,
  convertSignatureEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { convertDescriptionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer:markup/ast-converter/shared/example.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { convertRemarks } from "unwritten:renderer:markup/ast-converter/shared/remarks.js";
import { convertTagsForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/tags.js";
import { SECTION_TYPE } from "unwritten:renderer:markup/types-definitions/sections.js";
import { registerAnchor } from "unwritten:renderer:markup/utils/linker.js";
import {
  createAnchorNode,
  createListNode,
  createSectionNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";
import {
  extendClassEntityConstructorsWithHeritage,
  extendClassEntityEntitiesWithHeritage
} from "unwritten:renderer:utils/heritage.js";

import type { ClassEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedClassEntityForDocumentation,
  ConvertedClassEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertClassEntityForTableOfContents(ctx: MarkupRenderContexts, classEntity: ClassEntity): ConvertedClassEntityForTableOfContents {

  const renderConfig = getRenderConfig(ctx);

  const name = classEntity.name;
  const id = classEntity.symbolId;

  const anchor = createAnchorNode(
    name,
    id
  );

  const constructorEntity = extendClassEntityConstructorsWithHeritage(classEntity);
  const propertyEntities = extendClassEntityEntitiesWithHeritage(classEntity, "properties");
  const methodEntities = extendClassEntityEntitiesWithHeritage(classEntity, "methods");
  const setterEntities = extendClassEntityEntitiesWithHeritage(classEntity, "setters");
  const getterEntities = extendClassEntityEntitiesWithHeritage(classEntity, "getters");

  const publicConstructorEntity = renderConfig.renderPrivateMembers ? constructorEntity : constructorEntity && filterPrivateMembers([constructorEntity])[0];
  const publicPropertyEntities = renderConfig.renderPrivateMembers ? propertyEntities : filterPrivateMembers(propertyEntities);
  const publicMethodEntities = renderConfig.renderPrivateMembers ? methodEntities : filterPrivateMembers(methodEntities);
  const publicSetterEntities = renderConfig.renderPrivateMembers ? setterEntities : filterPrivateMembers(setterEntities);
  const publicGetterEntities = renderConfig.renderPrivateMembers ? getterEntities : filterPrivateMembers(getterEntities);

  const convertedConstructSignatures = publicConstructorEntity?.signatures.map(signatureEntity => convertSignatureEntityForTableOfContents(ctx, signatureEntity));
  const convertedProperties = publicPropertyEntities.map(propertyEntity => convertPropertyEntityForTableOfContents(ctx, propertyEntity));
  const convertedMethods = publicMethodEntities.map(methodEntity => convertFunctionLikeEntityForTableOfContents(ctx, methodEntity));
  const convertedSetters = publicSetterEntities.map(setterEntity => convertFunctionLikeEntityForTableOfContents(ctx, setterEntity));
  const convertedGetters = publicGetterEntities.map(getterEntity => convertFunctionLikeEntityForTableOfContents(ctx, getterEntity));

  return [
    anchor,
    createListNode(...convertedConstructSignatures ?? []),
    createListNode(...convertedProperties),
    createListNode(...convertedMethods),
    createListNode(...convertedSetters),
    createListNode(...convertedGetters)
  ];

}


export function convertClassEntityForDocumentation(ctx: MarkupRenderContexts, classEntity: ClassEntity): ConvertedClassEntityForDocumentation {

  const renderConfig = getRenderConfig(ctx);
  const t = getTranslator(ctx);

  const name = classEntity.name;
  const id = classEntity.symbolId;

  const anchor = registerAnchor(ctx, name, id);

  const convertedPosition = convertPosition(ctx, classEntity.position);
  const convertedTags = convertTagsForDocumentation(ctx, classEntity);
  const convertedDescription = convertDescriptionForDocumentation(ctx, classEntity.description);
  const convertedExample = convertExample(ctx, classEntity.example);
  const convertedRemarks = convertRemarks(ctx, classEntity.remarks);

  const constructorEntity = extendClassEntityConstructorsWithHeritage(classEntity);
  const propertyEntities = extendClassEntityEntitiesWithHeritage(classEntity, "properties");
  const methodEntities = extendClassEntityEntitiesWithHeritage(classEntity, "methods");
  const setterEntities = extendClassEntityEntitiesWithHeritage(classEntity, "setters");
  const getterEntities = extendClassEntityEntitiesWithHeritage(classEntity, "getters");

  const publicConstructorEntity = renderConfig.renderPrivateMembers ? constructorEntity : constructorEntity && filterPrivateMembers([constructorEntity])[0];
  const publicPropertyEntities = renderConfig.renderPrivateMembers ? propertyEntities : filterPrivateMembers(propertyEntities);
  const publicMethodEntities = renderConfig.renderPrivateMembers ? methodEntities : filterPrivateMembers(methodEntities);
  const publicSetterEntities = renderConfig.renderPrivateMembers ? setterEntities : filterPrivateMembers(setterEntities);
  const publicGetterEntities = renderConfig.renderPrivateMembers ? getterEntities : filterPrivateMembers(getterEntities);

  const convertedConstructSignatures = publicConstructorEntity?.signatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedProperties = publicPropertyEntities.map(propertyEntity => convertPropertyEntityForDocumentation(ctx, propertyEntity));
  const convertedMethods = publicMethodEntities.map(methodEntity => convertFunctionLikeEntityForDocumentation(ctx, methodEntity));
  const convertedSetters = publicSetterEntities.map(setterEntity => convertFunctionLikeEntityForDocumentation(ctx, setterEntity));
  const convertedGetters = publicGetterEntities.map(getterEntity => convertFunctionLikeEntityForDocumentation(ctx, getterEntity));

  return createSectionNode(
    SECTION_TYPE[classEntity.kind],
    createTitleNode(
      name,
      anchor,
      convertedPosition,
      convertedTags,
      convertedDescription,
      convertedRemarks,
      convertedExample,
      createTitleNode(t("construct-signature", { capitalizeEach: true, count: convertedConstructSignatures?.length }), convertedConstructSignatures),
      createTitleNode(t("property", { capitalize: true, count: convertedProperties.length }), convertedProperties),
      createTitleNode(t("method", { capitalize: true, count: convertedMethods.length }), convertedMethods),
      createTitleNode(t("setter", { capitalize: true, count: convertedSetters.length }), convertedSetters),
      createTitleNode(t("getter", { capitalize: true, count: convertedGetters.length }), convertedGetters)
    )
  );

}
