/* eslint-disable @typescript-eslint/naming-convention */
import { beforeAll, expect, it, vitest } from "vitest";

import { createConfig } from "unwritten:config/config.js";
import { mkdirSync, readFileSync, writeFileSync } from "unwritten:platform/file-system/browser.js";
import { } from "unwritten:platform/file-system/virtual-fs.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";


scope("Integration", "Config", async () => {

  beforeAll(() => {

    writeFileSync(".unwritten.json", JSON.stringify({
      renderConfig: {
        test: {
          ".unwritten.json": true
        }
      }
    }, null, 2));

    mkdirSync("node_modules/@namespace", { recursive: true });
    writeFileSync("node_modules/@namespace/.unwritten.json", JSON.stringify({
      renderConfig: {
        test: {
          ".unwritten.json": true
        }
      }
    }, null, 2));

    writeFileSync(".unwritten.js", JSON.stringify({
      renderConfig: {
        test: {
          ".unwritten.js": true
        }
      }
    }, null, 2));

    vitest.mock("/.unwritten.js", () => ({
      default: JSON.parse(readFileSync(".unwritten.js"))
    }));

    return () => vitest.restoreAllMocks();
  });

  const ctx = createRenderContext();

  it("should be able to read the config from a relative path", async () => {

    const config = await createConfig(ctx, ".unwritten.json");

    expect(config).toBeDefined();
    expect(config.interpreterConfig).toBeDefined();
    expect(config.renderConfig).toBeDefined();
    expect(config.renderConfig.test).toBeDefined();
    expect(config.renderConfig.test[".unwritten.json"]).toBe(true);

  });

  it("should be able to create a config from an object", async () => {

    const config = await createConfig(ctx, {
      renderConfig: {
        test: {
          object: true
        }
      }
    });

    expect(config).toBeDefined();
    expect(config.interpreterConfig).toBeDefined();
    expect(config.renderConfig).toBeDefined();
    expect(config.renderConfig.test).toBeDefined();
    expect(config.renderConfig.test.object).toBe(true);

  });

  it("should be able to read the config from a javascript file", async () => {

    const config = await createConfig(ctx, ".unwritten.js");

    expect(config).toBeDefined();
    expect(config.interpreterConfig).toBeDefined();
    expect(config.renderConfig).toBeDefined();
    expect(config.renderConfig.test).toBeDefined();
    expect(config.renderConfig.test[".unwritten.js"]).toBe(true);

  });

  it("should be able to override default configurations", async () => {

    const config = await createConfig(ctx, {
      renderConfig: {
        markdown: {
          removeHyphenAtStartOfTag: false
        }
      }
    });

    expect(config.renderConfig.markdown).toBeDefined();
    expect(config.renderConfig.markdown.removeHyphenAtStartOfTag).toBe(false);

  });

  it("should be able to extend a config", async () => {

    const config = await createConfig(ctx, {
      extends: "@namespace"
    });

    expect(config.renderConfig.test).toBeDefined();
    expect(config.renderConfig.test[".unwritten.json"]).toBe(true);

  });

  it("should be able to override extended configurations", async () => {

    const config = await createConfig(ctx, {
      renderConfig: {
        test: {
          ".unwritten.json": "overridden"
        }
      }
    });

    expect(config.renderConfig.test).toBeDefined();
    expect(config.renderConfig.test[".unwritten.json"]).toBe("overridden");

  });

});
