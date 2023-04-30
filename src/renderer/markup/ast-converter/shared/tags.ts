import { convertJSDocTags } from "unwritten:renderer/markup/ast-converter/shared/jsdoc-tags.js";
import { convertModifiers } from "unwritten:renderer/markup/ast-converter/shared/modifiers.js";
import { convertOptional } from "unwritten:renderer/markup/ast-converter/shared/optional.js";
import { createSmallNode } from "unwritten:renderer/markup/utils/nodes.js";
import { spaceBetween } from "unwritten:renderer/markup/utils/renderer.js";

import type { Entities } from "unwritten:interpreter/type-definitions/entities.js";
import type { JSDocTags } from "unwritten:interpreter/type-definitions/shared.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";
import type { ConvertedTags } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertTags(ctx: MarkupRenderContexts, entityWithTags: Entities & JSDocTags): ConvertedTags {

  const convertedJSDocTags = convertJSDocTags(ctx, entityWithTags);
  const convertedModifiers = "modifiers" in entityWithTags ? convertModifiers(ctx, entityWithTags.modifiers) : [];
  const convertedOptional = "optional" in entityWithTags ? [convertOptional(ctx, entityWithTags)] : [];

  const convertedTags = [
    ...convertedJSDocTags,
    ...convertedModifiers,
    ...convertedOptional
  ];

  return convertedTags.length > 0
    ? createSmallNode(...spaceBetween(...convertedTags))
    : "";

}
