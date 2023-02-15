import { getDefaultConfig } from "unwritten:config/index.js";
import htmlRenderer from "unwritten:renderer:markup/html/index.js";
import { override } from "unwritten:utils:override.js";

import type { HTMLRenderContext } from "unwritten:renderer/markup/types-definitions/markup.d.js";


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
    indentation: 0,
    linkRegistry: {},
    renderer: htmlRenderer
  };
}
