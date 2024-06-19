import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { convertObjectTypeMultiline } from "unwritten:renderer:markup/ast-converter/types/index";

import type { ClassType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedClassTypeInline,
  ConvertedClassTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertClassTypeInline(ctx: MarkupRenderContext, classType: ClassType): ConvertedClassTypeInline {

  const renderConfig = getRenderConfig(ctx);

  return encapsulate(
    classType.name,
    renderConfig.typeEncapsulation
  );

}

export function convertClassTypeMultiline(ctx: MarkupRenderContext, classType: ClassType): ConvertedClassTypeMultiline {
  return convertObjectTypeMultiline(ctx, classType);
}
