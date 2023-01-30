import { getDefaultConfig } from "unwritten:config/index.js";
import { markdownRenderer } from "unwritten:renderer/markup/markdown/index.js";
import { override } from "unwritten:utils:override.js";

import type { MarkupRenderer } from "unwritten:renderer:markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.d.js";


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
