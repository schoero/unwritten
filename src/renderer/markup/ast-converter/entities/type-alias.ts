import {
  convertTypeParameterEntitiesForSignature,
  convertTypeParameterEntityForDocumentation
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { convertType } from "unwritten:renderer:markup/ast-converter/index.js";
import { convertJSDocTags } from "unwritten:renderer:markup/ast-converter/shared/jsdoc-tags.js";
import { convertPosition } from "unwritten:renderer:markup/ast-converter/shared/position.js";
import {
  createLinkNode,
  createListNode,
  createParagraphNode,
  createSmallNode,
  createTitleNode
} from "unwritten:renderer:markup/utils/nodes.js";
import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";

import type { TypeAliasEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedTypeAliasEntityForDocumentation,
  ConvertedTypeAliasEntityForTableOfContents
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertTypeAliasEntityForTableOfContents(ctx: MarkupRenderContexts, typeAliasEntity: TypeAliasEntity): ConvertedTypeAliasEntityForTableOfContents {

  const signatureName = typeAliasEntity.name;
  const renderedSignatureTypeParameters = typeAliasEntity.typeParameters
    ? convertTypeParameterEntitiesForSignature(ctx, typeAliasEntity.typeParameters)
    : "";
  const renderedSignature = [signatureName, "<", renderedSignatureTypeParameters, ">"];

  return createLinkNode(renderedSignature, typeAliasEntity.symbolId);
}


export function convertTypeAliasEntityForDocumentation(ctx: MarkupRenderContexts, typeAliasEntity: TypeAliasEntity): ConvertedTypeAliasEntityForDocumentation {

  const translate = getTranslator(ctx);

  const signatureName = typeAliasEntity.name;
  const renderedSignatureTypeParameters = typeAliasEntity.typeParameters
    ? convertTypeParameterEntitiesForSignature(ctx, typeAliasEntity.typeParameters)
    : "";
  const renderedSignature = [signatureName, "<", renderedSignatureTypeParameters, ">"];
  const id = typeAliasEntity.symbolId;

  const description = typeAliasEntity.description ?? "";
  const example = typeAliasEntity.example ?? "";
  const remarks = typeAliasEntity.remarks ?? "";

  const position = typeAliasEntity.position ? convertPosition(ctx, typeAliasEntity.position) : "";
  const jsdocTags = convertJSDocTags(ctx, typeAliasEntity);


  const typeParameters = typeAliasEntity.typeParameters
    ? typeAliasEntity.typeParameters.map(typeParameter => convertTypeParameterEntityForDocumentation(ctx, typeParameter))
    : "";

  const type = [`${translate("type", { capitalize: true, count: 1 })}: `, convertType(ctx, typeAliasEntity.type)];

  return createTitleNode(
    renderedSignature,
    id,
    createSmallNode(position),
    createParagraphNode(jsdocTags),
    createListNode([
      ...typeParameters,
      type
    ]),
    createParagraphNode(description),
    createParagraphNode(example),
    createParagraphNode(remarks)
  );

}
