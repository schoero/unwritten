import { convertType } from "unwritten:renderer/markup/ast-converter/index.js";
import { createWrapperNode } from "unwritten:renderer/markup/utils/nodes.js";

import type { UnionType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type { ASTNodes } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { ConvertedUnionType } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertUnionType(ctx: MarkupRenderContexts, unionType: UnionType): ConvertedUnionType {

  const result: ASTNodes[] = [];

  unionType.types.map((type, index) => {
    const convertedType = convertType(ctx, type);
    result.push(convertedType);
    if(index < unionType.types.length - 1){
      result.push(" | ");
    }
  });

  return createWrapperNode(
    ...result
  );

}
