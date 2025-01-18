import {
  createClassEntity,
  createInterfaceEntity,
  createVariableEntity
} from "unwritten:interpreter/ast/entities/index";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import {
  convertPropertyEntityForDocumentation,
  convertPropertyEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index";
import { convertObjectLiteralTypeMultiline } from "unwritten:renderer:markup/ast-converter/types/index";
import { renderNode } from "unwritten:renderer:markup/html/index";
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
import { expect, it } from "vitest";

import type { ObjectLiteralType } from "unwritten:interpreter:type-definitions/types";


scope("MarkupRenderer", EntityKind.Property, () => {

  {

    const testFileContent = ts`
      export interface Interface {
        /**
         * Property description
         * @remarks Property remarks
         * @example Property example
         */
        readonly prop?: string;
      }
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const interfaceEntity = createInterfaceEntity(compilerContext, symbol);
    const propertyEntity = interfaceEntity.properties[0];
    const ctx = createRenderContext();

    const convertedPropertyForSignature = convertPropertyEntityForTableOfContents(ctx, propertyEntity);
    const convertedPropertyForDocumentation = convertPropertyEntityForDocumentation(ctx, propertyEntity);

    const titleNode = convertedPropertyForDocumentation.title;

    assert(isSectionNode(convertedPropertyForDocumentation));
    assert(isTitleNode(titleNode));

    const [
      tags,
      position,
      type,
      description,
      remarks,
      example
    ] = titleNode.children;

    it("should have a matching name", () => {
      assert(isAnchorNode(convertedPropertyForSignature));
      expect(convertedPropertyForSignature.children[0]).toBe("prop");
      expect(titleNode.title).toBe("prop");
    });

    it("should have a matching type", () => {
      assert(isTitleNode(type));
      assert(isParagraphNode(type.children[0]));
      expect(type.children[0].children[0]).toBe("string");
    });

    it("should have a position", () => {
      const renderedPosition = renderNode(ctx, position);
      expect(renderedPosition).toBeTruthy();
    });

    it("should have an optional tag", () => {
      assert(isParagraphNode(tags));
      const renderedTags = renderNode(ctx, tags.children);
      expect(renderedTags).toContain("optional");
    });

    it("should have a readonly modifier tag", () => {
      assert(isParagraphNode(tags));
      const renderedTags = renderNode(ctx, tags.children);
      expect(renderedTags).toContain("readonly");
    });

    it("should have a matching description", () => {
      assert(isTitleNode(description));
      expect(description.children[0].children[0]).toBe("Property description");
    });

    it("should have a matching remarks", () => {
      assert(isTitleNode(remarks));
      expect(remarks.children[0].children[0]).toBe("Property remarks");
    });

    it("should have a matching example", () => {
      assert(isTitleNode(example));
      expect(example.children[0].children[0]).toBe("Property example");
    });

  }

  {

    const testFileContent = ts`
      export class Class {
        public publicProperty: undefined;
        private privateProperty: undefined;
        static staticProperty: undefined;
        readonly readonlyProperty: undefined;
        accessor accessorProperty: undefined;
        #nativePrivateProperty: undefined;
      }
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const classEntity = createClassEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const convertedPropertiesForDocumentation = classEntity.properties.map(
      propertyEntity => convertPropertyEntityForDocumentation(ctx, propertyEntity)
    );

    const modifiers = convertedPropertiesForDocumentation.map(
      convertedPropertyForDocumentation => {
        const propertyTags = convertedPropertyForDocumentation.title?.children[0];
        assert(isParagraphNode(propertyTags));
        return renderNode(ctx, propertyTags);
      }
    );

    it("should render the public modifier", () => {
      expect(modifiers[0]).toContain("public");
    });

    it("should render the private modifier", () => {
      expect(modifiers[1]).toContain("private");
    });

    it("should render the static modifier", () => {
      expect(modifiers[2]).toContain("static");
    });

    it("should render the readonly modifier", () => {
      expect(modifiers[3]).toContain("readonly");
    });

    it("should render the accessor as get and set modifiers", () => {
      expect(modifiers[4]).toContain("get");
      expect(modifiers[4]).toContain("set");
    });

    it("should render the native private modifier", () => {
      expect(modifiers[5]).toContain("private");
    });

  }

  {

    const testFileContent = ts`
      export const obj = {
        /** Property description */
        property: 7,
        /** Method description */
        method() {},
        /** Function property description */
        functionProperty: () => {},
      };
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "obj")!;
    const variableEntity = createVariableEntity(compilerContext, symbol);
    const type = variableEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertObjectLiteralTypeMultiline(ctx, type as ObjectLiteralType);

    const [
      constructSignatures,
      callSignatures,
      properties,
      methods,
      setters,
      getters
    ] = convertedType.children;

    it("should render the property name, type and description", () => {
      expect(properties.children[0].children[0]).toContain("property");
      expect(properties.children[0].children[0]).toContain("number");
      expect(properties.children[0].children[0]).toContainEqual(["Property description"]);

      expect(properties.children[1].children[0]).toContain("functionProperty");
      expect(properties.children[1].children[0]).toContain("function");
      expect(properties.children[1].children[0]).toContainEqual(["Function property description"]);
    });

  }

});
