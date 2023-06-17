/* eslint-disable @typescript-eslint/naming-convention */
import { expect, it, vitest } from "vitest";

import { createConfig } from "unwritten:config/index.js";
import { scope } from "unwritten:tests:utils/scope.js";


scope("Integration", "Config", async () => {

  vitest.mock("node:fs", async () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const actual = await vitest.importActual<typeof import("node:fs")>("node:fs");
    return {
      ...actual,
      existsSync: vitest.fn().mockImplementation((path: string) => {
        if(path.includes(".unwritten.json")){
          return true;
        } else if(path.includes(".unwritten.js")){
          return true;
        } else {
          return false;
        }
      })
    };
  });

  vitest.mock(`${await getDirectory()}/.unwritten.json`, () => {
    return {
      default: {
        renderConfig: {
          test: {
            ".unwritten.json": true
          }
        }
      }
    };
  });

  vitest.mock(`${await getDirectory()}/.unwritten.js`, () => {
    return {
      default: {
        renderConfig: {
          test: {
            ".unwritten.js": true
          }
        }
      }
    };
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
      extends: `${await getDirectory()}/.unwritten.json`
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

async function getDirectory() {
  const { resolve } = await import("node:path");
  return resolve("./");
}
