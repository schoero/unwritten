import { expect, it } from "vitest";

import { createInterfaceEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import {
  convertInterfaceEntityForDocumentation,
  convertInterfaceEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import {
  isAnchorNode,
  isListNode,
  isParagraphNode,
  isSmallNode,
  isTitleNode
} from "unwritten:renderer:markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("MarkupRenderer", TypeKind.Interface, () => {

  {

    const testFileContent = ts`
      export interface Interface {
        (): void;
        new (): void;
        method(a: number): void;
        method(a: string): void;
        prop: string;
        funcProp: () => void;
        get getter(): string;
        set setter(value: string);
      }
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const interfaceEntity = createInterfaceEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const convertedInterfaceForTableOfContents = convertInterfaceEntityForTableOfContents(ctx, interfaceEntity);
    const convertedInterfaceForDocumentation = convertInterfaceEntityForDocumentation(ctx, interfaceEntity);

    const titleNode = convertedInterfaceForDocumentation.children[0];

    const [
      position,
      tags,
      description,
      remarks,
      example,
      constructSignatures,
      callSignatures,
      properties,
      methods,
      setters,
      getters
    ] = titleNode.children;

    it("should have matching interface name", () => {
      assert(isAnchorNode(convertedInterfaceForTableOfContents));
      expect(convertedInterfaceForTableOfContents.children[0]).toBe("Interface");
      expect(titleNode.title).toBe("Interface");
    });

    it("should have a position", () => {
      assert(isSmallNode(position));
      expect(position.children[0]).not.toBe("");
    });

    it("should have no tags", () => {
      expect(tags).toBe("");
    });

    it("should have one construct signature", () => {
      expect(constructSignatures.children).toHaveLength(1);
    });

    it("should have one call signature", () => {
      expect(callSignatures.children).toHaveLength(1);
    });

    it("should have two properties", () => {
      expect(properties.children).toHaveLength(2);
    });

    it("should have one method signature", () => {
      expect(methods.children).toHaveLength(2);
    });

    it("should have one setter signature", () => {
      expect(setters.children).toHaveLength(1);
    });

    it("should have one getter signature", () => {
      expect(getters.children).toHaveLength(1);
    });

  }

  {

    const testFileContent = ts`
      /**
       * Interface description
       *
       * @example Interface example
       * @remarks Interface remarks
       * @beta
       * @deprecated Interface Deprecation message
       */
      export interface Interface {
        /**
         * Call signature description
         *
         * @example Call signature example
         * @remarks Call signature remarks
         * @beta
         * @throws Call signature throws
         * @deprecated Call signature deprecation message
         */
        (): void;
        new (): void;
        funcProp: () => void;
        get getter(): string;
        method(a: number): void;
        method(a: string): void;
        /**
         * Property description
         *
         * @example Property example
         * @remarks Property remarks
         * @beta
         * @deprecated Property deprecation message
         */
        prop: string;
        set setter(value: string);
      }
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const interfaceEntity = createInterfaceEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const convertedInterfaceForDocumentation = convertInterfaceEntityForDocumentation(ctx, interfaceEntity);

    const titleNode = convertedInterfaceForDocumentation.children[0];

    const [
      interfacePosition,
      interfaceTags,
      interfaceDescription,
      interfaceRemarks,
      interfaceExample,
      constructSignatures,
      callSignatures,
      properties,
      methods,
      setters,
      getters
    ] = titleNode.children;

    const [
      callSignaturePosition,
      callSignatureTags,
      callSignatureTypeParameters,
      callSignatureParameters,
      callSignatureReturnType,
      callSignatureThrows,
      callSignatureDescription,
      callSignatureRemarks,
      callSignatureExample
    ] = callSignatures.children[0].children[0].children;

    const [
      propertyTags,
      propertyPosition,
      propertyType,
      propertyDescription,
      propertyRemarks,
      propertyExample
    ] = properties.children[1].children;

    it("should have a matching interface description", () => {
      assert(isTitleNode(interfaceDescription));
      expect(interfaceDescription.children[0].children[0]).toBe("Interface description");
    });

    it("should have a matching interface remarks", () => {
      assert(isTitleNode(interfaceRemarks));
      expect(interfaceRemarks.children[0].children[0]).toBe("Interface remarks");
    });

    it("should have a matching interface example", () => {
      assert(isTitleNode(interfaceExample));
      expect(interfaceExample.children[0].children[0]).toBe("Interface example");
    });

    it("should have a interface position", () => {
      expect(interfacePosition).toBeDefined();
    });

    it("should have a interface tags", () => {
      assert(isParagraphNode(interfaceTags));
      expect(interfaceTags.children).toContain("beta");
      expect(interfaceTags.children).toContain("deprecated");
    });

    it("should have a matching call signature throws", () => {
      assert(isTitleNode(callSignatureThrows));
      assert(isListNode(callSignatureThrows.children[0]));
      expect(callSignatureThrows.children[0].children[0]).toStrictEqual([
        "Call signature throws"
      ]);
    });

    it("should have a matching call signature description", () => {
      assert(isTitleNode(callSignatureDescription));
      expect(callSignatureDescription.children[0].children[0]).toBe("Call signature description");
    });

    it("should have a matching call signature remarks", () => {
      assert(isTitleNode(callSignatureRemarks));
      expect(callSignatureRemarks.children[0].children[0]).toBe("Call signature remarks");
    });

    it("should have a matching call signature example", () => {
      assert(isTitleNode(callSignatureExample));
      expect(callSignatureExample.children[0].children[0]).toBe("Call signature example");
    });

    it("should have a call signature position", () => {
      expect(callSignaturePosition).toBeDefined();
    });

    it("should have a call signature tags", () => {
      assert(isParagraphNode(callSignatureTags));
      expect(callSignatureTags.children).toContain("beta");
      expect(callSignatureTags.children).toContain("deprecated");
    });

    it("should have a matching property description", () => {
      assert(isTitleNode(propertyDescription));
      expect(propertyDescription.children[0].children[0]).toBe("Property description");
    });

    it("should have a matching property remarks", () => {
      assert(isTitleNode(propertyRemarks));
      expect(propertyRemarks.children[0].children[0]).toBe("Property remarks");
    });

    it("should have a matching property example", () => {
      assert(isTitleNode(propertyExample));
      expect(propertyExample.children[0].children[0]).toBe("Property example");
    });

    it("should have a property tags", () => {
      assert(isParagraphNode(propertyTags));
      expect(propertyTags.children).toContain("beta");
      expect(propertyTags.children).toContain("deprecated");
    });

  }

});
