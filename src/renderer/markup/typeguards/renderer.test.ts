import { expect, it } from "vitest";

import { scope } from "unwritten:tests:utils/scope.js";

import { isListNode, isParagraphNode, isRenderedMultilineContent, isTitleNode } from "./renderer.js";

import type {
  RenderedList,
  RenderedMultilineContent,
  RenderedParagraph,
  RenderedTitle
} from "../types-definitions/markup.js";


scope("Renderer", "Render abstraction typeguards", () => {

  {

    it("should identify a list correctly", () => {

      const simpleList: RenderedList = [[
        "element 1",
        "element 2"
      ]];

      expect(isListNode(simpleList)).to.equal(true);
      expect(isParagraphNode(simpleList)).to.equal(false);
      expect(isTitleNode(simpleList)).to.equal(false);
      expect(isRenderedMultilineContent(simpleList)).to.equal(false);

      const nestedList: RenderedList = [[
        "element 1",
        [[
          "element 2",
          "element 3"
        ]]
      ]];

      expect(isListNode(nestedList)).to.equal(true);
      expect(isParagraphNode(nestedList)).to.equal(false);
      expect(isTitleNode(nestedList)).to.equal(false);
      expect(isRenderedMultilineContent(nestedList)).to.equal(false);

      const listWithParagraph: RenderedList = [[
        ["element 1"]
      ]];

      expect(isListNode(listWithParagraph)).to.equal(true);
      expect(isParagraphNode(listWithParagraph)).to.equal(false);
      expect(isTitleNode(listWithParagraph)).to.equal(false);
      expect(isRenderedMultilineContent(listWithParagraph)).to.equal(false);

      const listWithMultilineContent: RenderedList = [[
        [
          "element 1",
          "element 2"
        ]
      ]];

      expect(isListNode(listWithMultilineContent)).to.equal(true);
      expect(isParagraphNode(listWithMultilineContent)).to.equal(false);
      expect(isTitleNode(listWithMultilineContent)).to.equal(false);
      expect(isRenderedMultilineContent(listWithMultilineContent)).to.equal(false);

    });


    it("should identify a paragraph correctly", () => {

      const simpleParagraph: RenderedParagraph = [
        "element"
      ];

      expect(isParagraphNode(simpleParagraph)).to.equal(true);
      expect(isListNode(simpleParagraph)).to.equal(false);
      expect(isTitleNode(simpleParagraph)).to.equal(false);
      expect(isRenderedMultilineContent(simpleParagraph)).to.equal(false);

    });


    it("should identify multiline content correctly", () => {

      const simpleParagraph: RenderedMultilineContent = [
        "element 1",
        "element 2"
      ];

      expect(isRenderedMultilineContent(simpleParagraph)).to.equal(true);
      expect(isParagraphNode(simpleParagraph)).to.equal(false);
      expect(isListNode(simpleParagraph)).to.equal(false);
      expect(isTitleNode(simpleParagraph)).to.equal(false);

      const multilineContentWithParagraphs: RenderedMultilineContent = [
        ["element 1"],
        ["element 2"]
      ];

      expect(isRenderedMultilineContent(multilineContentWithParagraphs)).to.equal(true);
      expect(isParagraphNode(multilineContentWithParagraphs)).to.equal(false);
      expect(isListNode(multilineContentWithParagraphs)).to.equal(false);
      expect(isTitleNode(multilineContentWithParagraphs)).to.equal(false);

    });

    it("should identify a title correctly", () => {

      const simpleTitle: RenderedTitle = {
        title: "content"
      };

      expect(isTitleNode(simpleTitle)).to.equal(true);
      expect(isRenderedMultilineContent(simpleTitle)).to.equal(false);
      expect(isParagraphNode(simpleTitle)).to.equal(false);
      expect(isListNode(simpleTitle)).to.equal(false);

    });

    it("should handle deeply nested arrays correctly", () => {

      const paragraph: RenderedParagraph = ["element"];
      const multilineContentWithParagraphs: RenderedMultilineContent = [paragraph, paragraph];
      const listWithMultilineContentWithParagraphs: RenderedList = [[multilineContentWithParagraphs]];

      expect(isListNode(listWithMultilineContentWithParagraphs)).to.equal(true);
      expect(isParagraphNode(listWithMultilineContentWithParagraphs)).to.equal(false);
      expect(isTitleNode(listWithMultilineContentWithParagraphs)).to.equal(false);
      expect(isRenderedMultilineContent(listWithMultilineContentWithParagraphs)).to.equal(false);

    });

  }

});
