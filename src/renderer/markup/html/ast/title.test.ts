import { expect, it } from "vitest";

import { createTitleNode } from "unwritten:renderer/markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:tests:utils/template.js";

import { renderTitleNode } from "./title.js";


scope("Renderer", "HTMLRenderer", () => {

  const ctx = createRenderContext();

  it("should render a single title correctly", () => {
    const titleNode = createTitleNode("Title", 0);
    expect(renderTitleNode(ctx, titleNode)).to.equal("<h1>Title</h1>");
  });

  it("should increase size for nested titles", () => {
    const titleNode = createTitleNode(
      "Title",
      0,
      [
        createTitleNode("SubTitle", 1)
      ]
    );
    expect(renderTitleNode(ctx, titleNode)).to.equal(html`
      <h1>Title</h1>
      <h2>SubTitle</h2>
    `);
  });

  it("should not increase size for titles on the same level", () => {
    const titleNode = createTitleNode(
      "Title",
      0,
      [
        createTitleNode("Subtitle", 2),
        createTitleNode("Another Subtitle", 2)
      ]
    );
    expect(renderTitleNode(ctx, titleNode)).to.equal(html`
      <h1>Title</h1>
      <h2>Subtitle</h2>
      <h2>Another Subtitle</h2>
    `);
  });

});
