import { getRenderConfig } from "unwritten:renderer/markup/utils/config.js";
import { encapsulate, spaceBetween } from "unwritten:renderer/markup/utils/renderer.js";

import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";


export function renderModifiers(ctx: MarkupRenderContexts, modifiers: string[]) {

  const renderConfig = getRenderConfig(ctx);

  const transformedModifiers = modifiers.reduce<string[]>((acc, modifier) => {
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

  const renderedModifiers = transformedModifiers.map(
    modifier => encapsulate(modifier, renderConfig.tagEncapsulation)
  );

  return spaceBetween(...renderedModifiers);

}
