import { convertDescription } from "unwritten:renderer/markup/ast-converter/shared/description.js";
import { convertExample } from "unwritten:renderer/markup/ast-converter/shared/example.js";
import { convertRemarks } from "unwritten:renderer/markup/ast-converter/shared/remarks.js";
import { convertTags } from "unwritten:renderer/markup/ast-converter/shared/tags.js";
import { getRenderConfig } from "unwritten:renderer/markup/utils/config.js";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";
import {
  convertTypeParameterEntitiesForDocumentation,
  convertTypeParameterEntitiesForSignature
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import { convertType } from "unwritten:renderer:markup/ast-converter/shared/type.js";
import { createLinkNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";

import type { TypeAliasEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedTypeAliasEntityForDocumentation,
  ConvertedTypeAliasEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertTypeAliasEntityForTableOfContents(ctx: MarkupRenderContexts, typeAliasEntity: TypeAliasEntity): ConvertedTypeAliasEntityForTableOfContents {
  const renderedSignature = renderTypeAliasSignature(ctx, typeAliasEntity);
  return createLinkNode(
    renderedSignature,
    typeAliasEntity.symbolId
  );
}


export function convertTypeAliasEntityForDocumentation(ctx: MarkupRenderContexts, typeAliasEntity: TypeAliasEntity): ConvertedTypeAliasEntityForDocumentation {

  const renderedSignature = renderTypeAliasSignature(ctx, typeAliasEntity);
  const id = typeAliasEntity.symbolId;

  const convertedPosition = convertPosition(ctx, typeAliasEntity.position);
  const convertedTags = convertTags(ctx, typeAliasEntity);
  const convertedDescription = convertDescription(ctx, typeAliasEntity.description);
  const convertedRemarks = convertRemarks(ctx, typeAliasEntity.remarks);
  const convertedExample = convertExample(ctx, typeAliasEntity.example);
  const convertedTypeParameterEntities = convertTypeParameterEntitiesForDocumentation(ctx, typeAliasEntity.typeParameters);
  const convertedType = convertType(ctx, typeAliasEntity.type);

  return createTitleNode(
    renderedSignature,
    id,
    convertedPosition,
    convertedTags,
    convertedTypeParameterEntities,
    convertedType,
    convertedDescription,
    convertedRemarks,
    convertedExample
  );

}


function renderTypeAliasSignature(ctx: MarkupRenderContexts, typeAliasEntity: TypeAliasEntity) {

  const renderConfig = getRenderConfig(ctx);

  const typeAliasName = typeAliasEntity.name;
  const renderedSignatureTypeParameters = typeAliasEntity.typeParameters
    ? convertTypeParameterEntitiesForSignature(ctx, typeAliasEntity.typeParameters)
    : "";

  return [
    typeAliasName,
    encapsulate(
      renderedSignatureTypeParameters,
      renderConfig.typeParameterEncapsulation
    )
  ];

}
