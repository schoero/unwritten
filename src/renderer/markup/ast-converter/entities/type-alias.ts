import { renderNode } from "unwritten:renderer/index";
import { convertSeeTagsForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/see";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry";
import { renderMemberContext } from "unwritten:renderer/markup/utils/context";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import {
  convertTypeParameterEntitiesForDocumentation,
  convertTypeParameterEntitiesForSignature
} from "unwritten:renderer:markup/ast-converter/entities/index";
import { convertDescriptionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/description";
import { convertExamplesForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/example";
import { convertPositionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/position";
import { convertRemarksForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/remarks";
import { convertTagsForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/tags";
import { convertTypeForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/type";
import { SECTION_TYPE } from "unwritten:renderer:markup/types-definitions/sections";
import { createAnchorNode, createSectionNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes";
import { encapsulate } from "unwritten:renderer:markup/utils/renderer";

import type { TypeAliasEntity } from "unwritten:interpreter/type-definitions/entities";
import type { AnchorNode } from "unwritten:renderer/markup/types-definitions/nodes";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedTypeAliasEntityForDocumentation,
  ConvertedTypeAliasEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertTypeAliasEntityToAnchor(ctx: MarkupRenderContexts, typeAliasEntity: TypeAliasEntity, displayName?: string): AnchorNode {

  const id = typeAliasEntity.symbolId;
  const convertedSignatureForAnchor = convertTypeAliasSignature(ctx, typeAliasEntity, "documentation");
  const renderedSignatureForAnchor = renderNode(ctx, convertedSignatureForAnchor);

  const convertedSignatureForTableOfContents = convertTypeAliasSignature(ctx, typeAliasEntity, "tableOfContents");
  const renderedSignatureForTableOfContents = renderNode(ctx, convertedSignatureForTableOfContents);

  displayName ??= renderedSignatureForTableOfContents;

  return createAnchorNode(
    renderedSignatureForAnchor,
    id,
    displayName
  );

}

export function convertTypeAliasEntityForTableOfContents(ctx: MarkupRenderContexts, typeAliasEntity: TypeAliasEntity): ConvertedTypeAliasEntityForTableOfContents {
  return convertTypeAliasEntityToAnchor(ctx, typeAliasEntity);
}

export function convertTypeAliasEntityForDocumentation(ctx: MarkupRenderContexts, typeAliasEntity: TypeAliasEntity): ConvertedTypeAliasEntityForDocumentation {

  const signature = convertTypeAliasSignature(ctx, typeAliasEntity, "documentation");
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


function convertTypeAliasSignature(ctx: MarkupRenderContexts, typeAliasEntity: TypeAliasEntity, target: "documentation" | "tableOfContents") {

  const renderConfig = getRenderConfig(ctx);

  const name = typeAliasEntity.name;
  const nameWithContext = renderMemberContext(ctx, target, name);

  const convertedTypeParameters = typeAliasEntity.typeParameters && typeAliasEntity.typeParameters.length > 0 &&
    convertTypeParameterEntitiesForSignature(ctx, typeAliasEntity.typeParameters);

  const encapsulatedTypeParameters = convertedTypeParameters &&
     encapsulate(convertedTypeParameters, renderConfig.typeParameterEncapsulation);

  return [
    nameWithContext,
    encapsulatedTypeParameters
  ];

}
