import { createConfig } from "../../../../config/index.js";
import { CompleteConfig } from "../../../../types/config.js";
import { RenderContext } from "../../../../types/context.js";
import { markdownRenderer } from "../../markdown/index.js";
import { MarkupRenderer } from "../../types/renderer.js";


const defaultConfig = createConfig({
  externalTypes: {},
  renderConfig: {
    markdown: {
      parameterEncapsulation: false,
      propertyEncapsulation: false,
      stringLiteralTypeEncapsulation: false,
      tagEncapsulation: false,
      typeEncapsulation: false
    }
  }
});

export function createRenderContext(config: CompleteConfig = defaultConfig): RenderContext<MarkupRenderer> {
  return {
    config,
    renderer: markdownRenderer
  };
}