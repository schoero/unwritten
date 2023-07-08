import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";

import type { ExportableEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { JSONRenderContext, JSONRenderer } from "unwritten:renderer:json/type-definitions/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


export function isJSONRenderer(renderer: Renderer): renderer is JSONRenderer {
  return renderer.name === BuiltInRenderers.JSON;
}

function verifyRenderer(renderer: Renderer): asserts renderer is JSONRenderer {
  if(!isJSONRenderer(renderer)){
    throw new Error(`Renderer '${renderer.name}' is not a JSON renderer.`);
  }
}

function verifyContext(ctx: RenderContext<Renderer>): asserts ctx is JSONRenderContext {
  verifyRenderer(ctx.renderer);
}

const jsonRenderer: JSONRenderer = {
  fileExtension: ".json",
  name: BuiltInRenderers.JSON,

  render(ctx: RenderContext<Renderer>, entities: ExportableEntity[]) {


    //-- Initialize the context

    verifyContext(ctx);


    //-- Render

    const renderConfig = getRenderConfig(ctx);

    return JSON.stringify(entities, (key: PropertyKey, value: boolean | number | string | undefined) => {
      if(!renderConfig.includeIds){
        if(key === "declarationId" || key === "symbolId" || key === "typeId"){
          return;
        }
      }
      return value;
    }, renderConfig.indentation);

  }

};

export default jsonRenderer;
