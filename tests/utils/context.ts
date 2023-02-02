import { getDefaultConfig } from "unwritten:config/index.js";
import htmlRenderer from "unwritten:renderer:markup/html/index.js";
import { override } from "unwritten:utils:override.js";

import type { HTMLRenderContext } from "unwritten:renderer/markup/types/renderer.js";


const testConfig = override(getDefaultConfig(), {
  externalTypes: {},
  renderConfig: {
    html: {
      parameterEncapsulation: false,
      propertyEncapsulation: false,
      tagEncapsulation: false,
      typeEncapsulation: false
    }
  }
});

export function createRenderContext(): HTMLRenderContext {
  return {
    config: JSON.parse(JSON.stringify(testConfig)),
    renderer: htmlRenderer
  };
}
