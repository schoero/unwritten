import { expect, it } from "vitest";

import { createClassEntity } from "unwritten:interpreter/ast/entities/index";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { renderNode } from "unwritten:renderer/markup/html/index";
import {
  convertClassEntityForDocumentation,
  convertClassEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index";
import {
  isAnchorNode,
  isParagraphNode,
  isSectionNode,
  isTitleNode
} from "unwritten:renderer:markup/typeguards/renderer";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";


scope("MarkupRenderer", EntityKind.Class, () => {

  {

    const testFileContent = ts`
      export class Class {
        constructor() {}
        public prop: string;
        public method() {}
        public get getter(): string { return ""; }
        public set setter(value: string) {}
        static staticProp: string;
        protected protectedProp: string;
        /** @eventProperty */
        event;
      }
    `;

    const { ctx: compilerContext, exportedSymbols, fileSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const classEntity = createClassEntity(compilerContext, symbol);

    const ctx = createRenderContext();

    const convertedClassForTableOfContents = convertClassEntityForTableOfContents(ctx, classEntity);
    const convertedClassForDocumentation = convertClassEntityForDocumentation(ctx, classEntity);

    const titleNode = convertedClassForDocumentation.title;

    assert(isSectionNode(convertedClassForDocumentation));
    assert(isTitleNode(titleNode));

    const [
      tags,
      position,
      description,
      remarks,
      example,
      see,
      constructSignatures,
      properties,
      methods,
      setters,
      getters,
      events
    ] = titleNode.children;

    it("should have a matching title", () => {
      assert(isAnchorNode(convertedClassForTableOfContents[0]));
      expect(convertedClassForTableOfContents[0].name).toBe("Class");
    });

    it("should have a position", () => {
      const renderedPosition = renderNode(ctx, position);
      expect(renderedPosition).toBeTruthy();
    });

    it("should have no tags", () => {
      expect(tags).toBeFalsy();
    });

    it("should have one construct signature", () => {
      expect(constructSignatures && constructSignatures.title?.children).toHaveLength(1);
    });

    it("should have three properties", () => {
      expect(properties && properties.title?.children).toHaveLength(3);
    });

    it("should support all possible modifiers", () => {

      const propertiesTitle = properties && properties.title;

      assert(isSectionNode(properties));
      assert(isTitleNode(propertiesTitle));

      const publicPropertyTags = propertiesTitle.children[0].title?.children[0];
      const staticPropertyTags = propertiesTitle.children[1].title?.children[0];
      const protectedPropertyTags = propertiesTitle.children[2].title?.children[0];

      assert(isParagraphNode(publicPropertyTags));
      assert(isParagraphNode(staticPropertyTags));
      assert(isParagraphNode(protectedPropertyTags));

      expect(renderNode(ctx, publicPropertyTags.children)).toContain("public");
      expect(renderNode(ctx, staticPropertyTags.children)).toContain("static");
      expect(renderNode(ctx, protectedPropertyTags.children)).toContain("protected");
    });

    it("should have one method signature", () => {
      expect(methods && methods.title?.children).toHaveLength(1);
    });

    it("should have one setter signature", () => {
      expect(setters && setters.title?.children).toHaveLength(1);
    });

    it("should have one getter signature", () => {
      expect(getters && getters.title?.children).toHaveLength(1);
    });

    it("should have one event", () => {
      expect(events && events.title?.children).toHaveLength(1);
    });

  }

  {

    const testFileContent = ts`
      class BaseClass {
      }
      export class Class extends BaseClass {
      }
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const classEntity = createClassEntity(compilerContext, symbol);

    const ctx = createRenderContext();

    const convertedClassForDocumentation = convertClassEntityForDocumentation(ctx, classEntity);

    const titleNode = convertedClassForDocumentation.title;

    assert(isSectionNode(convertedClassForDocumentation));
    assert(isTitleNode(titleNode));


    const [
      position,
      tags,
      description,
      remarks,
      example,
      see,
      constructSignatures,
      properties,
      methods,
      setters,
      getters
    ] = titleNode.children;

    it("should not render implicit constructors", () => {
      expect(constructSignatures).toBeFalsy();
    });

  }

});
