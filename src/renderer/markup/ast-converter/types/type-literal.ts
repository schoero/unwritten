import {
  convertFunctionLikeEntityForDocumentation,
  convertPropertyEntityForDocumentation,
  convertSignatureEntityForDocumentation
} from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { createTitleNode } from "unwritten:renderer/markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";

import type { TypeLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";
import type { ConvertedTypeLiteralType } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertTypeLiteralType(ctx: MarkupRenderContexts, typeLiteralType: TypeLiteralType): ConvertedTypeLiteralType {

  const translate = getTranslator(ctx);

  const convertedProperties = typeLiteralType.properties.map(propertyEntity => convertPropertyEntityForDocumentation(ctx, propertyEntity));
  const convertedConstructSignatures = typeLiteralType.constructSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedCallSignatures = typeLiteralType.callSignatures.map(signatureEntity => convertSignatureEntityForDocumentation(ctx, signatureEntity));
  const convertedSetters = typeLiteralType.setters.map(setterEntity => convertFunctionLikeEntityForDocumentation(ctx, setterEntity));
  const convertedGetters = typeLiteralType.getters.map(getterEntity => convertFunctionLikeEntityForDocumentation(ctx, getterEntity));
  const convertedMethods = typeLiteralType.methods.map(methodEntity => convertFunctionLikeEntityForDocumentation(ctx, methodEntity));

  return [
    createTitleNode(translate("construct-signature", { count: 99 }), undefined, convertedConstructSignatures),
    createTitleNode(translate("call-signature", { count: 99 }), undefined, convertedCallSignatures),
    createTitleNode(translate("property", { count: 99 }), undefined, convertedProperties),
    createTitleNode(translate("method", { count: 99 }), undefined, convertedMethods),
    createTitleNode(translate("setter", { count: 99 }), undefined, convertedSetters),
    createTitleNode(translate("getter", { count: 99 }), undefined, convertedGetters)
  ];

}
