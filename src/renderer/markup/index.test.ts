import { describe, expect, it } from "vitest";

import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:tests:utils/template.js";

import { createListNode } from "./utils/nodes.js";
import { renderListNode } from "./index.js";

import type { ListNode } from "./types-definitions/nodes.js";


scope("Renderer", "Render abstraction", () => {

  describe("renderRenderObject", () => {

    {

      const testFileContent: ListNode = createListNode([
        "element 1",
        "element 2"
      ]);

      const renderedList = renderListNode({ indentation: 0, renderContext: createRenderContext(), size: 1 }, testFileContent);

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

      const testFileContent: ListNode = createListNode([]);

      const renderedList = renderListNode({ indentation: 0, renderContext: createRenderContext(), size: 1 }, testFileContent);

      it("should not render empty lists", () => {
        expect(renderedList).to.equal(html``);
      });

    }

    {

      const testFileContent: ListNode = createListNode([
        "element 1",
        createListNode([
          "element 2",
          "element 3"
        ])
      ]);

      const renderedList = renderListNode({ indentation: 0, renderContext: createRenderContext(), size: 1 }, testFileContent);


      it("should render nested lists correctly", () => {
        expect(renderedList).to.equal(html`
          <ul>
            <li>element 1
              <ul>
                <li>element 2</li>
                <li>element 3</li>
              </ul>
            </li>
          </ul>
        `);
      });

    }

  });

});
