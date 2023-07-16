/* eslint-disable @typescript-eslint/naming-convention */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

import { beforeAll, expect, it, vitest } from "vitest";

import { createConfig } from "unwritten:config/config.js";
import { scope } from "unwritten:tests:utils/scope.js";


scope("Integration", "Config", async () => {

  beforeAll(() => {
    vitest.mock("node:fs", async () => import("unwritten:utils:virtual-fs.js"));

    mkdirSync(process.cwd(), { recursive: true });
    writeFileSync(`${process.cwd()}/.unwritten.json`, JSON.stringify({
      renderConfig: {
        test: {
          ".unwritten.json": true
        }
      }
    }, null, 2));

    writeFileSync(`${process.cwd()}/.unwritten.js`, JSON.stringify({
      renderConfig: {
        test: {
          ".unwritten.js": true
        }
      }
    }, null, 2));

    vitest.mock(`${process.cwd()}/.unwritten.js`, () => ({
      default: JSON.parse(readFileSync(`${process.cwd()}/.unwritten.js`, { encoding: "utf-8" }))
    }));

    return () => vitest.restoreAllMocks();
  });

  it("should be able to read the config from a relative path", async () => {

    const config = await createConfig({}, ".unwritten.json");

    expect(config).toBeDefined();
    expect(config.interpreterConfig).toBeDefined();
    expect(config.renderConfig).toBeDefined();
    expect(config.renderConfig.test).toBeDefined();
    expect(config.renderConfig.test[".unwritten.json"]).toBe(true);

  });

  it("should be able to create a config from an object", async () => {

    const config = await createConfig({}, {
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

    const config = await createConfig({}, ".unwritten.js");

    expect(config).toBeDefined();
    expect(config.interpreterConfig).toBeDefined();
    expect(config.renderConfig).toBeDefined();
    expect(config.renderConfig.test).toBeDefined();
    expect(config.renderConfig.test[".unwritten.js"]).toBe(true);

  });

  it("should be able to override default configurations", async () => {

    const config = await createConfig({}, {
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

    const config = await createConfig({}, {
      extends: ".unwritten.json"
    });

    expect(config.renderConfig.test).toBeDefined();
    expect(config.renderConfig.test[".unwritten.json"]).toBe(true);

  });

  it("should be able to override extended configurations", async () => {

    const config = await createConfig({}, {
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
