import { getRenderConfig } from "unwritten:renderer/utils/config.js";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";

import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ASTNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function convertModifiers(ctx: MarkupRenderContexts, modifiers?: string[]): ASTNode[] {

  const renderConfig = getRenderConfig(ctx);

  const transformedModifiers = modifiers?.reduce<string[]>((acc, modifier) => {
    if(modifier === "accessor"){
      acc.push("get");
      acc.push("set");
    } else if(modifier === "nativePrivate"){
      acc.push("private");
    } else {
      acc.push(modifier);
    }
    return acc;
  }, []);

  const convertedModifiers = transformedModifiers?.map(
    modifier => encapsulate(modifier, renderConfig.tagEncapsulation)
  );

  return spaceBetween(...convertedModifiers ?? []);

}
