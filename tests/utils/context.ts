import { getDefaultConfig } from "quickdoks:config/index.js";
import { markdownRenderer } from "quickdoks:renderer/markup/markdown/index.js";
import { override } from "quickdoks:utils:override.js";

import type { MarkupRenderer } from "quickdoks:renderer:markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


const testConfig = override(getDefaultConfig(), {
  externalTypes: {},
  renderConfig: {
    markdown: {
      parameterEncapsulation: false,
      propertyEncapsulation: false,
      tagEncapsulation: false,
      typeEncapsulation: false
    }
  }
});

export function createRenderContext(): RenderContext<MarkupRenderer> {
  return {
    config: JSON.parse(JSON.stringify(testConfig)),
    renderer: markdownRenderer
  };
}
