import { createConfig } from "../../src/config/index.js";
import { markdownRenderer } from "../../src/renderer/markup/markdown/index.js";
import { MarkupRenderer } from "../../src/renderer/markup/types/renderer.js";
import { CompleteConfig } from "../../src/types/config.js";
import { RenderContext } from "../../src/types/context.js";


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
