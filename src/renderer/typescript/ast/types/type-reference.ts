import { renderType } from "unwritten:renderer:typescript/ast/index.js";

import type { TypeReferenceType } from "unwritten:interpreter:type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer:typescript/type-definitions/renderer.js";


export function renderTypeReferenceType(ctx: TypeScriptRenderContext, typeReferenceType: TypeReferenceType): string {

  const name = typeReferenceType.name ?? "";

  const typeArguments = typeReferenceType.typeArguments
    ? `<${typeReferenceType.typeArguments.map(
      typeArgument =>
        renderType(ctx, typeArgument)
    ).join(", ")}>`
    : "";

  return `${name}${typeArguments}`;

}
