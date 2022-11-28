import { getDefaultConfig } from "../../src/config/index.js";
import { markdownRenderer } from "../../src/renderer/markup/markdown/index.js";
import { MarkupRenderer } from "../../src/renderer/markup/types/renderer.js";
import { RenderContext } from "../../src/types/context.js";
import { override } from "../../src/utils/override.js";


const testConfig = override(getDefaultConfig(), {
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

export function createRenderContext(): RenderContext<MarkupRenderer> {
  return {
    config: testConfig,
    renderer: markdownRenderer
  };
}
