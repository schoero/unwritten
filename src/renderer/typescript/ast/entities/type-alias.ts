import { renderTypeParameterEntity } from "unwritten:renderer/typescript/ast/entities/type-parameter.js";
import { renderType } from "unwritten:renderer/typescript/ast/index.js";
import { renderSemicolon } from "unwritten:renderer/typescript/utils/keywords.js";

import type { TypeAliasEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderTypeAliasEntity(ctx: TypeScriptRenderContext, typeAliasEntity: TypeAliasEntity): string {

  const name = typeAliasEntity.name;

  const renderedSemicolon = renderSemicolon(ctx);

  const renderedTypeParameters = typeAliasEntity.typeParameters
    ? `<${typeAliasEntity.typeParameters.map(
      typeParameter => renderTypeParameterEntity(ctx, typeParameter)
    ).join(", ")}>`
    : "";

  const renderedType = renderType(ctx, typeAliasEntity.type);

  return `type ${name}${renderedTypeParameters} = ${renderedType}${renderedSemicolon}`;

}
