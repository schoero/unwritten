import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createLinkNode, createListNode } from "unwritten:renderer/markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";
import { getTranslator } from "unwritten:renderer/markup/utils/translations.js";
import { isMultilineUnionType } from "unwritten:renderer/markup/utils/types.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type.js";

import type { UnionType } from "unwritten:interpreter:type-definitions/types.js";
import type { ASTNodes } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedUnionTypeInline,
  ConvertedUnionTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertUnionTypeInline(ctx: MarkupRenderContexts, unionType: UnionType): ConvertedUnionTypeInline {

  const translate = getTranslator(ctx);
  const renderConfig = getRenderConfig(ctx);

  if(!isMultilineUnionType(unionType)){

    return unionType.types.reduce<ASTNodes[]>((astNodes, type, index) => {
      const { inlineType, multilineType } = convertType(ctx, type);
      const convertedType = multilineType ?? inlineType;

      astNodes.push(convertedType);
      if(index < unionType.types.length - 1){
        astNodes.push(" | ");
      }

      return astNodes;

    }, []);
  }

  const encapsulatedType = encapsulate(
    translate("union"),
    renderConfig.typeEncapsulation
  );

  return ctx.config.externalTypes[TypeKind.Union]
    ? createLinkNode(encapsulatedType, ctx.config.externalTypes[TypeKind.Union])
    : encapsulatedType;

}

export function convertUnionTypeMultiline(ctx: MarkupRenderContexts, unionType: UnionType): ConvertedUnionTypeMultiline {
  const types = unionType.types.map(type => {

    const { inlineType, multilineType } = convertType(ctx, type);

    return [
      [inlineType],
      multilineType ?? ""
    ];

  });

  return createListNode(...types);

}
