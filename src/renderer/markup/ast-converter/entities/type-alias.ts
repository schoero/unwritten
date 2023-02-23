import { convertTypeParameterEntitiesForSignature } from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { convertType } from "unwritten:renderer/markup/ast-converter/index.js";
import { convertJSDocTags } from "unwritten:renderer/markup/ast-converter/shared/jsdoc-tags.js";
import { convertPosition } from "unwritten:renderer/markup/ast-converter/shared/position.js";
import {
  createLinkNode,
  createListNode,
  createParagraphNode,
  createSmallNode,
  createTitleNode
} from "unwritten:renderer/markup/utils/nodes.js";
import { useTranslation } from "unwritten:renderer/markup/utils/translations.js";

import type { TypeAliasEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type {
  ConvertedTypeAliasEntityForDocumentation,
  ConvertedTypeAliasEntityForTableOfContents
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertTypeAliasEntityForTableOfContents(ctx: MarkupRenderContexts, typeAlias: TypeAliasEntity): ConvertedTypeAliasEntityForTableOfContents {
  return createLinkNode(typeAlias.name, typeAlias.id);
}


export function convertTypeAliasEntityForDocumentation(ctx: MarkupRenderContexts, typeAliasEntity: TypeAliasEntity): ConvertedTypeAliasEntityForDocumentation {

  const t = useTranslation(ctx);

  const name = typeAliasEntity.name;
  const description = typeAliasEntity.description ?? "";
  const example = typeAliasEntity.example ?? "";
  const remarks = typeAliasEntity.remarks ?? "";

  const position = typeAliasEntity.position ? convertPosition(ctx, typeAliasEntity.position) : "";
  const jsdocTags = convertJSDocTags(ctx, typeAliasEntity);

  const typeParameters = typeAliasEntity.typeParameters
    ? convertTypeParameterEntitiesForSignature(ctx, typeAliasEntity.typeParameters)
    : "";

  const type = [`${t("type", { capitalize: true })}: `, convertType(ctx, typeAliasEntity.type)];

  return createTitleNode(
    name,
    typeAliasEntity.id,
    [
      createSmallNode(position),
      createParagraphNode(jsdocTags),
      createListNode([
        ...typeParameters,
        type
      ]),
      createParagraphNode(description),
      createParagraphNode(example),
      createParagraphNode(remarks)
    ]
  );

}
