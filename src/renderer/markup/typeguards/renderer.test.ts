import { expect, it } from "vitest";

import { scope } from "unwritten:tests:utils/scope.js";

import { isRenderedList, isRenderedMultilineContent, isRenderedParagraph, isRenderedTitle } from "./renderer.js";

import type { RenderedList, RenderedMultilineContent, RenderedParagraph, RenderedTitle } from "../types/renderer.js";


scope("Renderer", "Render abstraction typeguards", () => {

  {

    it("should identify a list correctly", () => {

      const simpleList: RenderedList = [[
        "element 1",
        "element 2"
      ]];

      expect(isRenderedList(simpleList)).to.equal(true);
      expect(isRenderedParagraph(simpleList)).to.equal(false);
      expect(isRenderedTitle(simpleList)).to.equal(false);
      expect(isRenderedMultilineContent(simpleList)).to.equal(false);

      const nestedList: RenderedList = [[
        "element 1",
        [[
          "element 2",
          "element 3"
        ]]
      ]];

      expect(isRenderedList(nestedList)).to.equal(true);
      expect(isRenderedParagraph(nestedList)).to.equal(false);
      expect(isRenderedTitle(nestedList)).to.equal(false);
      expect(isRenderedMultilineContent(nestedList)).to.equal(false);

      const listWithParagraph: RenderedList = [[
        ["element 1"]
      ]];

      expect(isRenderedList(listWithParagraph)).to.equal(true);
      expect(isRenderedParagraph(listWithParagraph)).to.equal(false);
      expect(isRenderedTitle(listWithParagraph)).to.equal(false);
      expect(isRenderedMultilineContent(listWithParagraph)).to.equal(false);

      const listWithMultilineContent: RenderedList = [[
        [
          "element 1",
          "element 2"
        ]
      ]];

      expect(isRenderedList(listWithMultilineContent)).to.equal(true);
      expect(isRenderedParagraph(listWithMultilineContent)).to.equal(false);
      expect(isRenderedTitle(listWithMultilineContent)).to.equal(false);
      expect(isRenderedMultilineContent(listWithMultilineContent)).to.equal(false);

    });


    it("should identify a paragraph correctly", () => {

      const simpleParagraph: RenderedParagraph = [
        "element"
      ];

      expect(isRenderedParagraph(simpleParagraph)).to.equal(true);
      expect(isRenderedList(simpleParagraph)).to.equal(false);
      expect(isRenderedTitle(simpleParagraph)).to.equal(false);
      expect(isRenderedMultilineContent(simpleParagraph)).to.equal(false);

    });


    it("should identify multiline content correctly", () => {

      const simpleParagraph: RenderedMultilineContent = [
        "element 1",
        "element 2"
      ];

      expect(isRenderedMultilineContent(simpleParagraph)).to.equal(true);
      expect(isRenderedParagraph(simpleParagraph)).to.equal(false);
      expect(isRenderedList(simpleParagraph)).to.equal(false);
      expect(isRenderedTitle(simpleParagraph)).to.equal(false);

      const multilineContentWithParagraphs: RenderedMultilineContent = [
        ["element 1"],
        ["element 2"]
      ];

      expect(isRenderedMultilineContent(multilineContentWithParagraphs)).to.equal(true);
      expect(isRenderedParagraph(multilineContentWithParagraphs)).to.equal(false);
      expect(isRenderedList(multilineContentWithParagraphs)).to.equal(false);
      expect(isRenderedTitle(multilineContentWithParagraphs)).to.equal(false);

    });

    it("should identify a title correctly", () => {

      const simpleTitle: RenderedTitle = {
        title: "content"
      };

      expect(isRenderedTitle(simpleTitle)).to.equal(true);
      expect(isRenderedMultilineContent(simpleTitle)).to.equal(false);
      expect(isRenderedParagraph(simpleTitle)).to.equal(false);
      expect(isRenderedList(simpleTitle)).to.equal(false);

    });

    it("should handle deeply nested arrays correctly", () => {

      const paragraph: RenderedParagraph = ["element"];
      const multilineContentWithParagraphs: RenderedMultilineContent = [paragraph, paragraph];
      const listWithMultilineContentWithParagraphs: RenderedList = [[multilineContentWithParagraphs]];

      expect(isRenderedList(listWithMultilineContentWithParagraphs)).to.equal(true);
      expect(isRenderedParagraph(listWithMultilineContentWithParagraphs)).to.equal(false);
      expect(isRenderedTitle(listWithMultilineContentWithParagraphs)).to.equal(false);
      expect(isRenderedMultilineContent(listWithMultilineContentWithParagraphs)).to.equal(false);

    });

  }

});
