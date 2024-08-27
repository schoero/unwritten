import { TypeKind } from "unwritten:interpreter/enums/type";
import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type";
import { createLinkNode, createListNode, createMultilineNode } from "unwritten:renderer/markup/utils/nodes";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer";
import { getTranslator } from "unwritten:renderer/markup/utils/translations";
import { isMultilineUnionType } from "unwritten:renderer/markup/utils/types";
import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { UnionType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedUnionTypeInline,
  ConvertedUnionTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer";
import type { ASTNode } from "unwritten:renderer/markup/types-definitions/nodes";


export function convertUnionTypeInline(ctx: MarkupRenderContext, unionType: UnionType): ConvertedUnionTypeInline {

  const translate = getTranslator(ctx);
  const renderConfig = getRenderConfig(ctx);

  if(!isMultilineUnionType(unionType)){

    return unionType.types.reduce<ASTNode[]>((astNodes, type, index) => {
      const { inlineType, multilineType } = convertType(ctx, type);
      const convertedType = multilineType || inlineType;

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

export function convertUnionTypeMultiline(ctx: MarkupRenderContext, unionType: UnionType): ConvertedUnionTypeMultiline {

  const types = unionType.types.map(type => {

    const { inlineType, multilineType } = convertType(ctx, type);

    return createMultilineNode(
      inlineType,
      multilineType
    );

  });

  return createListNode(...types);

}
