import { getDefaultConfig } from "quickdoks:config/index.js";
import { markdownRenderer } from "quickdoks:renderer:markup/markdown/index.js";
import { MarkupRenderer } from "quickdoks:renderer:markup/types/renderer.js";
import { override } from "quickdoks:utils:override.js";

import { RenderContext } from "quickdoks:type-definitions/context.d.js";


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
