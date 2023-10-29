import { renderNode } from "unwritten:renderer/index.js";
import { convertSeeTagsForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/see.js";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { renderMemberContext } from "unwritten:renderer/markup/utils/context.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import {
  convertTypeParameterEntitiesForDocumentation,
  convertTypeParameterEntitiesForSignature
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { convertDescriptionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/description.js";
import { convertExamplesForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/example.js";
import { convertPositionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { convertRemarksForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/remarks.js";
import { convertTagsForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/tags.js";
import { convertTypeForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/type.js";
import { SECTION_TYPE } from "unwritten:renderer:markup/types-definitions/sections.js";
import { createAnchorNode, createSectionNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer.js";

import type { TypeAliasEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { AnchorNode } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedTypeAliasEntityForDocumentation,
  ConvertedTypeAliasEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertTypeAliasEntityToAnchor(ctx: MarkupRenderContexts, typeAliasEntity: TypeAliasEntity, displayName?: string): AnchorNode {

  const id = typeAliasEntity.symbolId;
  const convertedSignature = convertTypeAliasSignature(ctx, typeAliasEntity);
  const renderedSignature = renderNode(ctx, convertedSignature);

  return createAnchorNode(
    renderedSignature,
    id,
    displayName
  );

}

export function convertTypeAliasEntityForTableOfContents(ctx: MarkupRenderContexts, typeAliasEntity: TypeAliasEntity): ConvertedTypeAliasEntityForTableOfContents {
  return convertTypeAliasEntityToAnchor(ctx, typeAliasEntity);
}

export function convertTypeAliasEntityForDocumentation(ctx: MarkupRenderContexts, typeAliasEntity: TypeAliasEntity): ConvertedTypeAliasEntityForDocumentation {

  const signature = convertTypeAliasSignature(ctx, typeAliasEntity);
  const position = convertPositionForDocumentation(ctx, typeAliasEntity.position);
  const tags = convertTagsForDocumentation(ctx, typeAliasEntity);

  const typeParameterEntities = convertTypeParameterEntitiesForDocumentation(ctx, typeAliasEntity.typeParameters);
  const type = convertTypeForDocumentation(ctx, typeAliasEntity.type);

  const description = typeAliasEntity.description && convertDescriptionForDocumentation(ctx, typeAliasEntity.description);
  const remarks = typeAliasEntity.remarks && convertRemarksForDocumentation(ctx, typeAliasEntity.remarks);
  const example = typeAliasEntity.example && convertExamplesForDocumentation(ctx, typeAliasEntity.example);
  const see = typeAliasEntity.see && convertSeeTagsForDocumentation(ctx, typeAliasEntity.see);

  const renderedSignature = renderNode(ctx, signature);

  const symbolId = typeAliasEntity.symbolId;
  const anchor = registerAnchor(ctx, renderedSignature, symbolId);

  return createSectionNode(
    SECTION_TYPE[typeAliasEntity.kind],
    createTitleNode(
      renderedSignature,
      anchor,
      tags,
      position,
      typeParameterEntities,
      type,
      description,
      remarks,
      example,
      see
    )
  );

}


function convertTypeAliasSignature(ctx: MarkupRenderContexts, typeAliasEntity: TypeAliasEntity) {

  const renderConfig = getRenderConfig(ctx);

  const name = typeAliasEntity.name;
  const nameWithContext = renderMemberContext(ctx, name);

  const convertedTypeParameters = typeAliasEntity.typeParameters && typeAliasEntity.typeParameters.length > 0 &&
    convertTypeParameterEntitiesForSignature(ctx, typeAliasEntity.typeParameters);

  const encapsulatedTypeParameters = convertedTypeParameters &&
     encapsulate(convertedTypeParameters, renderConfig.typeParameterEncapsulation);

  return [
    nameWithContext,
    encapsulatedTypeParameters
  ];

}
