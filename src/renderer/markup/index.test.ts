import { describe, expect, it } from "vitest";

import { renderRenderObject } from "unwritten:renderer:markup/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:tests:utils/template.js";

import type { RenderedList, RenderedTitle } from "./types/renderer.js";


scope("Renderer", "Render abstraction", () => {

  describe("renderRenderObject", () => {

    {

      const testFileContent: RenderedList = [[
        "element 1",
        "element 2"
      ]];

      const renderedList = renderRenderObject(createRenderContext(), testFileContent);

      it("should render lists correctly", () => {
        expect(renderedList).to.equal(html`
        <ul>
          <li>element 1</li>
          <li>element 2</li>
        </ul>
      `);
      });

    }

    {

      const testFileContent: RenderedList = [[
        "element 1",
        [[
          "element 2",
          "element 3"
        ]]
      ]];

      const renderedList = renderRenderObject(createRenderContext(), testFileContent);

      it("should render nested lists correctly", () => {
        expect(renderedList).to.equal(html`
          <ul>
            <li>element 1
            <ul>
              <li>element 2</li>
              <li>element 3</li>
            </ul></li>
          </ul>
        `);
      });

    }

    {

      const testFileContent: RenderedTitle = {
        title: "element"
      };


      const renderedList = renderRenderObject(createRenderContext(), testFileContent);

      it("should render nested lists correctly", () => {
        expect(renderedList).to.equal(html`
          <h1>title</h1>
          element
        `);
      });

    }

  });

});
