import type { ObjectType } from "unwritten:compiler/type-definitions/types.js";
import type { TypeScriptRenderContext } from "unwritten:renderer/typescript/type-definitions/renderer.js";


export function renderObjectType(ctx: TypeScriptRenderContext, objectType: ObjectType): string {

  if(objectType.name){
    return objectType.name;
  }

  return "object";

}
