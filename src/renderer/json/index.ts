import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { getDestinationFilePath } from "unwritten:renderer/markup/utils/file";
import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { SourceFileEntity } from "unwritten:interpreter/type-definitions/entities";
import type { JSONRenderContext, JSONRenderer } from "unwritten:renderer:json/type-definitions/renderer";
import type { RenderContext } from "unwritten:type-definitions/context";
import type { Renderer, RenderOutput } from "unwritten:type-definitions/renderer";


export function isJSONRenderer(renderer: Renderer): renderer is JSONRenderer {
  return renderer.name === BuiltInRenderers.JSON;
}

function verifyRenderer(renderer: Renderer): asserts renderer is JSONRenderer {
  if(!isJSONRenderer(renderer)){
    throw new Error(`Renderer '${renderer.name}' is not a JSON renderer.`);
  }
}

function verifyContext(ctx: RenderContext): asserts ctx is JSONRenderContext {
  verifyRenderer(ctx.renderer);
}

const jsonRenderer: JSONRenderer = {
  fileExtension: ".json",
  name: BuiltInRenderers.JSON,

  render(ctx: RenderContext, sourceFileEntities: SourceFileEntity[]) {

    // Initialize the context
    verifyContext(ctx);

    // Render
    const renderConfig = getRenderConfig(ctx);

    return sourceFileEntities.reduce<RenderOutput>((files, sourceFileEntity) => {
      const renderedContent = JSON.stringify(sourceFileEntity, (key: PropertyKey, value: boolean | number | string | undefined) => {
        if(!renderConfig.includeIds){
          if(key === "declarationId" || key === "symbolId" || key === "typeId"){
            return;
          }
        }
        return value;
      }, renderConfig.indentation);

      const destination = getDestinationFilePath(ctx, sourceFileEntities, sourceFileEntity);

      files[destination] = renderedContent;
      return files;

    }, {});

  }

};

export default jsonRenderer;
