/* eslint-disable @typescript-eslint/naming-convention */
import { expect, it } from "vitest";

import { createConfig } from "unwritten:config/index.js";
import { scope } from "unwritten:tests:utils/scope.js";


scope("Integration", "Config", async () => {

  it("should be able to read the config from a relative path", async () => {

    const config = await createConfig({}, "./tests/integration/config/.unwritten.json");

    expect(config).to.not.equal(undefined);
    expect(config.compilerConfig).to.not.equal(undefined);
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
    expect(config.compilerConfig).to.not.equal(undefined);
    expect(config.renderConfig).to.not.equal(undefined);
    expect(config.renderConfig.test).to.not.equal(undefined);
    expect(config.renderConfig.test.object).to.equal(true);

  });

  it("should be able to read the config from a javascript file", async () => {

    const config = await createConfig({}, "./tests/integration/config/.unwritten.js");

    expect(config).to.not.equal(undefined);
    expect(config.compilerConfig).to.not.equal(undefined);
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
      extends: "./tests/integration/config/.unwritten.json"
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
