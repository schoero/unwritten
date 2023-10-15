import { convertJSDocTags } from "unwritten:renderer/markup/ast-converter/shared/jsdoc.js";
import { convertRest } from "unwritten:renderer/markup/ast-converter/shared/rest.js";
import { convertModifiers } from "unwritten:renderer:markup/ast-converter/shared/modifiers.js";
import { convertOptional } from "unwritten:renderer:markup/ast-converter/shared/optional.js";
import { createParagraphNode } from "unwritten:renderer:markup/utils/nodes.js";
import { spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";

import type { Entity } from "unwritten:interpreter/type-definitions/entities.js";
import type { JSDocProperties } from "unwritten:interpreter/type-definitions/jsdoc";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedTagsForDocumentation,
  ConvertedTagsForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertTagsForDocumentation(ctx: MarkupRenderContexts, entityWithTags: Entity & JSDocProperties): ConvertedTagsForDocumentation {

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

export function convertTagsForType(ctx: MarkupRenderContexts, entityWithTags: Entity & JSDocProperties): ConvertedTagsForType {

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
