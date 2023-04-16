/* eslint-disable @typescript-eslint/naming-convention */
import { expect, it, vi } from "vitest";

import { createConfig } from "unwritten:config/index.js";
import { scope } from "unwritten:tests:utils/scope.js";


scope("Integration", "Config", async () => {

  vi.mock("node:fs", async () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const actual = await vi.importActual<typeof import("node:fs")>("node:fs");
    return {
      ...actual,
      existsSync: vi.fn().mockImplementation((path: string) => {
        console.log("MOCK existsSync", path);
        if(path.includes(".unwritten.json")){
          console.log("return true");
          return true;
        } else if(path.includes(".unwritten.js")){
          console.log("return true");
          return true;
        } else {
          console.log("return false");
          return false;
        }
      })
    };
  });

  vi.mock(`${await getDirectory()}/.unwritten.json`, () => {
    console.log("MOCK json");
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

  vi.mock(`${await getDirectory()}/.unwritten.js`, () => {
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

    expect(config).to.not.equal(undefined);
    expect(config.interpreterConfig).to.not.equal(undefined);
    expect(config.renderConfig).to.not.equal(undefined);
    expect(config.renderConfig.test).to.not.equal(undefined);
    expect(config.renderConfig.test[".unwritten.json"]).to.equal(true);

  });

  it("should be able to create a config from an object", async () => {

    const config = await createConfig({}, {
      renderConfig: {
        test: {
          object: true
        }
      }
    });

    expect(config).to.not.equal(undefined);
    expect(config.interpreterConfig).to.not.equal(undefined);
    expect(config.renderConfig).to.not.equal(undefined);
    expect(config.renderConfig.test).to.not.equal(undefined);
    expect(config.renderConfig.test.object).to.equal(true);

  });

  it("should be able to read the config from a javascript file", async () => {

    const config = await createConfig({}, ".unwritten.js");

    expect(config).to.not.equal(undefined);
    expect(config.interpreterConfig).to.not.equal(undefined);
    expect(config.renderConfig).to.not.equal(undefined);
    expect(config.renderConfig.test).to.not.equal(undefined);
    expect(config.renderConfig.test[".unwritten.js"]).to.equal(true);

  });

  it("should be able to override default configurations", async () => {

    const config = await createConfig({}, {
      renderConfig: {
        markdown: {
          removeHyphenAtStartOfTag: false
        }
      }
    });

    expect(config.renderConfig.markdown).to.not.equal(undefined);
    expect(config.renderConfig.markdown.removeHyphenAtStartOfTag).to.equal(false);

  });

  it("should be able to extend a config", async () => {

    const config = await createConfig({}, {
      extends: `${await getDirectory()}/.unwritten.json`
    });

    expect(config.renderConfig.test).to.not.equal(undefined);
    expect(config.renderConfig.test[".unwritten.json"]).to.equal(true);

  });

  it("should be able to override extended configurations", async () => {

    const config = await createConfig({}, {
      renderConfig: {
        test: {
          ".unwritten.json": "overridden"
        }
      }
    });

    expect(config.renderConfig.test).to.not.equal(undefined);
    expect(config.renderConfig.test[".unwritten.json"]).to.equal("overridden");

  });

});

async function getDirectory() {
  const { resolve } = await import("node:path");
  return resolve("./");
}
