import { renderNode } from "unwritten:renderer/index.js";
import { convertDescriptionForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer/markup/ast-converter/shared/example.js";
import { convertRemarks } from "unwritten:renderer/markup/ast-converter/shared/remarks.js";
import { convertTagsForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/tags.js";
import { SECTION_TYPE } from "unwritten:renderer/markup/enums/sections.js";
import { registerAnchor } from "unwritten:renderer/markup/utils/linker.js";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import {
  convertTypeParameterEntitiesForDocumentation,
  convertTypeParameterEntitiesForSignature
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { convertTypeForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/type.js";
import { createAnchorNode, createSectionNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";

import type { TypeAliasEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedTypeAliasEntityForDocumentation,
  ConvertedTypeAliasEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertTypeAliasEntityForTableOfContents(ctx: MarkupRenderContexts, typeAliasEntity: TypeAliasEntity): ConvertedTypeAliasEntityForTableOfContents {

  const convertedSignature = convertTypeAliasSignature(ctx, typeAliasEntity);
  const renderedSignature = renderNode(ctx, convertedSignature);
  const id = typeAliasEntity.symbolId;

  return createAnchorNode(
    renderedSignature,
    id
  );

}


export function convertTypeAliasEntityForDocumentation(ctx: MarkupRenderContexts, typeAliasEntity: TypeAliasEntity): ConvertedTypeAliasEntityForDocumentation {

  const convertedSignature = convertTypeAliasSignature(ctx, typeAliasEntity);
  const convertedPosition = convertPosition(ctx, typeAliasEntity.position);
  const convertedTags = convertTagsForDocumentation(ctx, typeAliasEntity);
  const convertedDescription = convertDescriptionForDocumentation(ctx, typeAliasEntity.description);
  const convertedRemarks = convertRemarks(ctx, typeAliasEntity.remarks);
  const convertedExample = convertExample(ctx, typeAliasEntity.example);
  const convertedTypeParameterEntities = convertTypeParameterEntitiesForDocumentation(ctx, typeAliasEntity.typeParameters);
  const convertedType = convertTypeForDocumentation(ctx, typeAliasEntity.type);

  const renderedSignature = renderNode(ctx, convertedSignature);
  const id = typeAliasEntity.symbolId;
  const anchor = registerAnchor(ctx, renderedSignature, id);

  return createSectionNode(
    SECTION_TYPE[typeAliasEntity.kind],
    createTitleNode(
      renderedSignature,
      anchor,
      convertedPosition,
      convertedTags,
      convertedTypeParameterEntities,
      convertedType,
      convertedDescription,
      convertedRemarks,
      convertedExample
    )
  );

}


function convertTypeAliasSignature(ctx: MarkupRenderContexts, typeAliasEntity: TypeAliasEntity) {

  const renderConfig = getRenderConfig(ctx);

  const typeAliasName = typeAliasEntity.name;

  const convertedTypeParameters = typeAliasEntity.typeParameters && typeAliasEntity.typeParameters.length > 0
    ? convertTypeParameterEntitiesForSignature(ctx, typeAliasEntity.typeParameters)
    : "";

  const encapsulatedTypeParameters = convertedTypeParameters
    ? encapsulate(convertedTypeParameters, renderConfig.typeParameterEncapsulation)
    : "";

  return [
    typeAliasName,
    encapsulatedTypeParameters
  ];

}
