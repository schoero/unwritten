import { expect, it } from "vitest";

import { registerAnchor } from "unwritten:renderer/markup/utils/linker.js";
import { createParagraphNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:utils/template.js";

import { renderTitleNode } from "./title.js";


scope("HTMLRenderer", "TitleNode", () => {

  const ctx = createRenderContext();

  it("should not render empty titles", () => {
    const titleNode = createTitleNode("Title");
    expect(renderTitleNode(ctx, titleNode)).to.equal("");
  });

  it("should render a single title correctly", () => {

    const titleNode = createTitleNode("Title", createParagraphNode("Paragraph"));

    expect(renderTitleNode(ctx, titleNode)).to.equal(html`
      <h1>Title</h1>
      <p>Paragraph</p>
    `);

  });

  it("should increase size for nested titles", () => {

    const titleNode = createTitleNode(
      "Title",
      createTitleNode("SubTitle", createParagraphNode("Paragraph"))
    );

    expect(renderTitleNode(ctx, titleNode)).to.equal(html`
      <h1>Title</h1>
      <h2>SubTitle</h2>
      <p>Paragraph</p>
    `);

  });

  it("should not increase size for titles on the same level", () => {

    const titleNode = createTitleNode(
      "Title",
      createTitleNode("Subtitle", createParagraphNode("Paragraph")),
      createTitleNode("Another Subtitle", createParagraphNode("Paragraph"))
    );

    const renderedTitle = renderTitleNode(ctx, titleNode);

    expect(renderedTitle).to.equal(html`
      <h1>Title</h1>
      <h2>Subtitle</h2>
      <p>Paragraph</p>
      <h2>Another Subtitle</h2>
      <p>Paragraph</p>
    `);

  });

  it("should filter out empty strings", () => {

    const titleNode = createTitleNode(
      "Title",
      createParagraphNode("Paragraph"),
      "",
      createParagraphNode("Paragraph2")
    );

    expect(renderTitleNode(ctx, titleNode)).to.equal(html`
      <h1>Title</h1>
      <p>Paragraph</p>
      <p>Paragraph2</p>
    `);

  });

  it("should render an id if the title has an anchor", () => {

    const anchor = registerAnchor(ctx, "title", 0);
    const titleNode = createTitleNode("Title", anchor, createParagraphNode("Paragraph"));

    expect(renderTitleNode(ctx, titleNode)).to.equal(html`
      <h1 id="title">Title</h1>
      <p>Paragraph</p>
    `);

  });

});
