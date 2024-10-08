import { convertModifiers } from "unwritten:renderer:markup/ast-converter/shared/modifiers";
import { convertOptional } from "unwritten:renderer:markup/ast-converter/shared/optional";
import { createParagraphNode } from "unwritten:renderer:markup/utils/nodes";
import { spaceBetween } from "unwritten:renderer:markup/utils/renderer";
import { convertJSDocTags } from "unwritten:renderer/markup/ast-converter/shared/jsdoc";
import { convertRest } from "unwritten:renderer/markup/ast-converter/shared/rest";

import type { Entity } from "unwritten:interpreter:type-definitions/entities";
import type { JSDocProperties } from "unwritten:interpreter:type-definitions/jsdoc";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedTagsForDocumentation,
  ConvertedTagsForType
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertTagsForDocumentation(ctx: MarkupRenderContext, entityWithTags: Entity & JSDocProperties): ConvertedTagsForDocumentation {

  const jsdocTags = convertJSDocTags(ctx, entityWithTags);
  const modifiers = "modifiers" in entityWithTags ? convertModifiers(ctx, entityWithTags.modifiers) : [];
  const optional = "optional" in entityWithTags ? convertOptional(ctx, entityWithTags) : [];

  const tags = [
    jsdocTags,
    modifiers,
    optional
  ].filter(
    convertedTag => convertedTag.length > 0
  );

  return tags.length > 0 &&
    createParagraphNode(...spaceBetween(...tags));

}

export function convertTagsForType(ctx: MarkupRenderContext, entityWithTags: Entity & JSDocProperties): ConvertedTagsForType {

  const jsdocTags = convertJSDocTags(ctx, entityWithTags);
  const modifiers = "modifiers" in entityWithTags ? convertModifiers(ctx, entityWithTags.modifiers) : [];
  const optional = "optional" in entityWithTags ? convertOptional(ctx, entityWithTags) : [];
  const rest = "rest" in entityWithTags ? convertRest(ctx, entityWithTags) : [];

  const tags = [
    jsdocTags,
    modifiers,
    optional,
    rest
  ].filter(
    convertedTag => convertedTag.length > 0
  );

  return tags.length > 0 &&
    spaceBetween(...tags);

}
