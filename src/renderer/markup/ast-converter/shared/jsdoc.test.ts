import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { RenderableJSDocKeyTags } from "unwritten:renderer:markup/enums/jsdoc.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import { convertJSDocTags, hasRenderableJSDocKeyTags } from "./jsdoc.js";


scope("MarkupRenderer", "JSDocTags", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should detect jsdoc tags correctly", () => {

    const jsdocTagNames = Object.values(RenderableJSDocKeyTags);

    for(const jsdocTagName of jsdocTagNames){
      expect(hasRenderableJSDocKeyTags({
        [jsdocTagName]: undefined
      })).toBe(true);
    }

  });

  it("should render jsdoc tags correctly", () => {

    const jsdocTagNames = Object.values(RenderableJSDocKeyTags);
    const renderedJSDocTags = convertJSDocTags(
      ctx,
      Object.fromEntries(jsdocTagNames.map(
        jsdocTagName => [jsdocTagName, undefined]
      ))
    );

    expect(renderedJSDocTags.join("")).toBe(Object.values(jsdocTagNames).join(" "));

  });

});
