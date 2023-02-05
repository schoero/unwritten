import { renderType } from "unwritten:renderer/markup/ast/index.js";
import { renderDescription } from "unwritten:renderer:markup/shared/description.js";
import { renderExample } from "unwritten:renderer:markup/shared/example.js";
import { renderJSDocTags } from "unwritten:renderer:markup/shared/jsdoc-tags.js";
import { renderName } from "unwritten:renderer:markup/shared/name.js";
import { renderPosition } from "unwritten:renderer:markup/shared/position.js";
import { renderRemarks } from "unwritten:renderer:markup/shared/remarks.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate, renderLink } from "unwritten:renderer:markup/utils/renderer.js";

import { renderTypeParameterForDocumentation, renderTypeParametersForSignature } from "./type-parameter.js";

import type { TypeAliasEntity } from "unwritten:compiler:type-definitions/entities.js";
import type {
  MarkupRenderContext,
  RenderedTypeAliasForDocumentation,
  RenderedTypeAliasForTableOfContents
} from "unwritten:renderer:markup/types/renderer.js";


export function renderTypeAliasForTableOfContents(ctx: MarkupRenderContext, typeAliasEntity: TypeAliasEntity): RenderedTypeAliasForTableOfContents {

  const renderConfig = getRenderConfig(ctx);
  const name = renderName(ctx, typeAliasEntity.name);

  const renderedTypeParameters = typeAliasEntity.typeParameters && renderTypeParametersForSignature(ctx, typeAliasEntity.typeParameters);
  const encapsulatedTypeParameters = renderedTypeParameters ? encapsulate(renderedTypeParameters, renderConfig.typeParameterEncapsulation) : "";
  const renderedSignature = `${name}${encapsulatedTypeParameters}`;

  const link = renderLink(ctx, renderedSignature, typeAliasEntity.id);
  return link;

}


export function renderTypeAliasForDocumentation(ctx: MarkupRenderContext, typeAliasEntity: TypeAliasEntity): RenderedTypeAliasForDocumentation {

  const renderConfig = getRenderConfig(ctx);

  const name = renderName(ctx, typeAliasEntity.name);
  const renderedTypeParameters = typeAliasEntity.typeParameters && renderTypeParametersForSignature(ctx, typeAliasEntity.typeParameters);
  const encapsulatedTypeParameters = renderedTypeParameters ? encapsulate(renderedTypeParameters, renderConfig.typeParameterEncapsulation) : "";
  const renderedSignature = `${name}${encapsulatedTypeParameters}`;

  const type = renderType(ctx, typeAliasEntity.type);
  const jsdocTags = renderJSDocTags(ctx, typeAliasEntity);
  const position = renderPosition(ctx, typeAliasEntity.position);
  const typeParameters = typeAliasEntity.typeParameters?.map(typeParameterEntity => renderTypeParameterForDocumentation(ctx, typeParameterEntity));
  const description = renderDescription(ctx, typeAliasEntity.description);
  const example = renderExample(ctx, typeAliasEntity.example);
  const remarks = renderRemarks(ctx, typeAliasEntity.remarks);

  return {
    [renderedSignature]: [
      jsdocTags,
      position,
      typeParameters,
      type,
      description,
      remarks,
      example
    ]
  };

}
