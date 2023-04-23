import { expect, it } from "vitest";

import { RenderableJSDocTags } from "unwritten:renderer:markup/enums/jsdoc.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import { convertJSDocTags, hasRenderableJSDocTags } from "./jsdoc-tags.js";


scope("MarkupRenderer", "Position", () => {

  const ctx = createRenderContext();

  it("should detect jsdoc tags correctly", () => {

    const jsdocTagNames = Object.values(RenderableJSDocTags);

    for(const jsdocTagName of jsdocTagNames){
      expect(hasRenderableJSDocTags({
        [jsdocTagName]: undefined
      })).to.equal(true);
    }

  });

  it("should render jsdoc tags correctly", () => {

    const jsdocTagNames = Object.values(RenderableJSDocTags);
    const renderedJSDocTags = convertJSDocTags(
      ctx,
      Object.fromEntries(jsdocTagNames.map(
        jsdocTagName => [jsdocTagName, undefined]
      ))
    );

    expect(renderedJSDocTags).to.equal(Object.values(jsdocTagNames).join(" "));

  });

});
