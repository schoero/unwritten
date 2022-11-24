import { ConditionalType as TSConditionalType } from "typescript";

import { CompilerContext } from "../../types/context.js";
import { ConditionalType, TypeKind } from "../../types/types.js";
import { getIdByType } from "../compositions/id.js";
import { normalizeTSMap } from "../utils/ts.js";
import { createTypeByType, createTypeByTypeNode } from "./type.js";


export function createConditionalType(ctx: CompilerContext, type: TSConditionalType): ConditionalType {

  const root = type.root;
  const id = getIdByType(ctx, type);
  const checkType = createTypeByTypeNode(ctx, root.node.checkType);
  const extendsType = createTypeByTypeNode(ctx, root.node.extendsType);
  const trueType = createTypeByTypeNode(ctx, root.node.trueType);
  const falseType = createTypeByTypeNode(ctx, root.node.falseType);

  const instantiations = root.instantiations &&
      Array.from(normalizeTSMap(root.instantiations).values())
        .filter(instantiation => id !== getIdByType(ctx, instantiation))
        .map(instantiation => createTypeByType(ctx, instantiation));

  const resolvedType = instantiations?.[0];

  const kind = TypeKind.ConditionalType;

  return {
    checkType,
    extendsType,
    falseType,
    id,
    kind,
    resolvedType,
    trueType
  };

}
