import { createConfig } from "../../../../config/index.js";
import { Complete, Config } from "../../../../types/config.js";
import { RenderContext } from "../../../../types/context.js";
import { plaintextRenderer } from "../../plaintext/index.js";
import { MarkupRenderConfig } from "../../types/config.js";
import { MarkupRenderer } from "../../types/renderer.js";


const defaultConfig = createConfig();

const plaintextConfig: MarkupRenderConfig = {
  ...defaultConfig.renderConfig["markdown"],
  parameterEncapsulation: false,
  propertyEncapsulation: false,
  stringLiteralTypeEncapsulation: false,
  tagEncapsulation: false,
  typeEncapsulation: false
};

defaultConfig.renderConfig["plaintext"] = plaintextConfig;


export function createRenderContext(config: Complete<Config> = defaultConfig): RenderContext<MarkupRenderer> {
  return {
    config,
    renderer: plaintextRenderer
  };
}