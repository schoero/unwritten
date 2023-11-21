import { getRenderConfig } from "unwritten:renderer/utils/config";
import { encapsulate, spaceBetween } from "unwritten:renderer:markup/utils/renderer";

import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { ASTNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function convertModifiers(ctx: MarkupRenderContext, modifiers?: string[]): ASTNode[] {

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
