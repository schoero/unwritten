import { expect, it } from "vitest";

import { registerAnchor, registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry";
import { createParagraphNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes";
import { createRenderContext } from "unwritten:tests:utils/context";
import { attachTestRegistry } from "unwritten:tests:utils/registry";
import { scope } from "unwritten:tests:utils/scope";
import { html } from "unwritten:utils/template";

import { renderTitleNode } from "./title";


scope("HTMLRenderer", "TitleNode", () => {

  it("should not render empty titles", () => {

    const ctx = createRenderContext();
    void attachTestRegistry(ctx);

    const title = "Title";
    const anchor = registerAnonymousAnchor(ctx, title);

    const titleNode = createTitleNode(title, anchor);
    expect(renderTitleNode(ctx, titleNode)).toBe("");

  });

  it("should render a single title correctly", () => {

    const ctx = createRenderContext();
    void attachTestRegistry(ctx);

    const title = "Title";
    const anchor = registerAnonymousAnchor(ctx, title);

    const titleNode = createTitleNode(title, anchor, createParagraphNode("Paragraph"));

    expect(renderTitleNode(ctx, titleNode)).toBe(html`
      <h1 id="title">Title</h1>
      <p>Paragraph</p>
    `);

  });

  it("should increase size for nested titles", () => {

    const ctx = createRenderContext();
    void attachTestRegistry(ctx);

    const title = "Title";
    const anchor = registerAnonymousAnchor(ctx, title);

    const subtitle = "Subtitle";
    const subtitleAnchor = registerAnonymousAnchor(ctx, subtitle);

    const titleNode = createTitleNode(
      title,
      anchor,
      createTitleNode(subtitle, subtitleAnchor, createParagraphNode("Paragraph"))
    );

    expect(renderTitleNode(ctx, titleNode)).toBe(html`
      <h1 id="title">Title</h1>
      <h2 id="subtitle">Subtitle</h2>
      <p>Paragraph</p>
    `);

  });

  it("should not increase size for titles on the same level", () => {

    const ctx = createRenderContext();
    void attachTestRegistry(ctx);

    const title = "Title";
    const anchor = registerAnonymousAnchor(ctx, title);

    const subtitle = "Subtitle";
    const subtitleAnchor = registerAnonymousAnchor(ctx, subtitle);

    const anotherSubtitle = "Another Subtitle";
    const anotherSubtitleAnchor = registerAnonymousAnchor(ctx, anotherSubtitle);

    const titleNode = createTitleNode(
      title,
      anchor,
      createTitleNode(subtitle, subtitleAnchor, createParagraphNode("Paragraph")),
      createTitleNode(anotherSubtitle, anotherSubtitleAnchor, createParagraphNode("Paragraph"))
    );

    const renderedTitle = renderTitleNode(ctx, titleNode);

    expect(renderedTitle).toBe(html`
      <h1 id="title">Title</h1>
      <h2 id="subtitle">Subtitle</h2>
      <p>Paragraph</p>
      <h2 id="another-subtitle">Another Subtitle</h2>
      <p>Paragraph</p>
    `);

  });

  it("should filter out empty strings", () => {

    const ctx = createRenderContext();
    void attachTestRegistry(ctx);

    const title = "Title";
    const anchor = registerAnonymousAnchor(ctx, title);

    const titleNode = createTitleNode(
      title,
      anchor,
      createParagraphNode("Paragraph"),
      "",
      createParagraphNode("Paragraph2")
    );

    expect(renderTitleNode(ctx, titleNode)).toBe(html`
      <h1 id="title">Title</h1>
      <p>Paragraph</p>
      <p>Paragraph2</p>
    `);

  });

  it("should render an id if the title has an anchor", () => {

    const ctx = createRenderContext();
    void attachTestRegistry(ctx);

    const title = "Title";
    const anchor = registerAnchor(ctx, title, 1);
    const titleNode = createTitleNode(title, anchor, createParagraphNode("Paragraph"));

    expect(renderTitleNode(ctx, titleNode)).toBe(html`
      <h1 id="title">Title</h1>
      <p>Paragraph</p>
    `);

  });

});
