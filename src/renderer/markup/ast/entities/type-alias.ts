import { renderType } from "unwritten:renderer/markup/entry-points/types.js";
import { renderDescription } from "unwritten:renderer/markup/mixins/description.js";
import { renderExample } from "unwritten:renderer/markup/mixins/example.js";
import { renderJSDocTags } from "unwritten:renderer/markup/mixins/jsdoc-tags.js";
import { renderName } from "unwritten:renderer/markup/mixins/name.js";
import { renderPosition } from "unwritten:renderer/markup/mixins/position.js";
import { renderRemarks } from "unwritten:renderer/markup/mixins/remarks.js";
import { getRenderConfig } from "unwritten:renderer/markup/utils/config.js";
import { encapsulate, renderLink } from "unwritten:renderer:markup/utils/renderer.js";

import { renderTypeParameterForDocumentation, renderTypeParametersForSignature } from "./type-parameter.js";

import type { TypeAliasEntity } from "unwritten:compiler/type-definitions/entities.js";
import type {
  MarkupRenderer,
  RenderedTypeAliasForDocumentation,
  RenderedTypeAliasForTableOfContents
} from "unwritten:renderer:markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.d.js";


export function renderTypeAliasForTableOfContents(ctx: RenderContext<MarkupRenderer>, typeAliasEntity: TypeAliasEntity): RenderedTypeAliasForTableOfContents {

  const renderConfig = getRenderConfig(ctx);
  const name = renderName(ctx, typeAliasEntity.name);

  const renderedTypeParameters = typeAliasEntity.typeParameters && renderTypeParametersForSignature(ctx, typeAliasEntity.typeParameters);
  const encapsulatedTypeParameters = renderedTypeParameters ? encapsulate(renderedTypeParameters, renderConfig.typeParameterEncapsulation) : "";
  const renderedSignature = `${name}${encapsulatedTypeParameters}`;

  const link = renderLink(ctx, renderedSignature, typeAliasEntity.id);
  return link;

}


export function renderTypeAliasForDocumentation(ctx: RenderContext<MarkupRenderer>, typeAliasEntity: TypeAliasEntity): RenderedTypeAliasForDocumentation {

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
