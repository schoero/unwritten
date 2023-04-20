import { expect, it } from "vitest";

import { createInterfaceEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import {
  convertInterfaceEntityForDocumentation,
  convertInterfaceEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { isParagraphNode, isSmallNode } from "unwritten:renderer:markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


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

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const interfaceEntity = createInterfaceEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const convertedInterfaceForTableOfContents = convertInterfaceEntityForTableOfContents(ctx, interfaceEntity);
    const convertedInterfaceForDocumentation = convertInterfaceEntityForDocumentation(ctx, interfaceEntity);

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
    ] = convertedInterfaceForDocumentation.children;

    it("should have matching interface name", () => {
      expect(convertedInterfaceForTableOfContents.children).to.equal("Interface");
      expect(convertedInterfaceForDocumentation.title).to.equal("Interface");
    });

    it("should have a position", () => {
      expect(isSmallNode(position)).to.equal(true);
      expect(position.children).to.not.equal("");
    });

    it("should have no tags", () => {
      expect(isParagraphNode(tags)).to.equal(true);
      const renderedTags = renderNode(ctx, tags);
      expect(renderedTags).to.equal("");
    });

    it("should have one construct signature", () => {
      expect(constructSignatures.children).to.have.lengthOf(1);
    });

    it("should have one call signature", () => {
      expect(callSignatures.children).to.have.lengthOf(1);
    });

    it("should have two properties", () => {
      expect(properties.children).to.have.lengthOf(2);
    });

    it("should have one method signature", () => {
      expect(methods.children).to.have.lengthOf(2);
    });

    it("should have one setter signature", () => {
      expect(setters.children).to.have.lengthOf(1);
    });

    it("should have one getter signature", () => {
      expect(getters.children).to.have.lengthOf(1);
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

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const interfaceEntity = createInterfaceEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const convertedInterfaceForDocumentation = convertInterfaceEntityForDocumentation(ctx, interfaceEntity);

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
    ] = convertedInterfaceForDocumentation.children;

    const [
      callSignaturePosition,
      callSignatureTags,
      callSignatureParameters,
      callSignatureDescription,
      callSignatureRemarks,
      callSignatureExample
    ] = callSignatures.children[0].children;

    const [
      propertyTags,
      propertyType,
      propertyDescription,
      propertyRemarks,
      propertyExample
    ] = properties.children[1].children;

    it("should have a matching interface description", () => {
      expect(interfaceDescription.children[0]).to.equal("Interface description");
    });

    it("should have a matching interface remarks", () => {
      expect(interfaceRemarks.children[0]).to.equal("Interface remarks");
    });

    it("should have a matching interface example", () => {
      expect(interfaceExample.children[0]).to.equal("Interface example");
    });

    it("should have a interface position", () => {
      expect(interfacePosition).to.not.equal(undefined);
    });

    it("should have a interface tags", () => {
      expect(interfaceTags.children[0]).to.include("beta");
      expect(interfaceTags.children[0]).to.include("deprecated");
    });

    it("should have a matching call signature description", () => {
      expect(callSignatureDescription.children[0]).to.equal("Call signature description");
    });

    it("should have a matching call signature remarks", () => {
      expect(callSignatureRemarks.children[0]).to.equal("Call signature remarks");
    });

    it("should have a matching call signature example", () => {
      expect(callSignatureExample.children[0]).to.equal("Call signature example");
    });

    it("should have a call signature position", () => {
      expect(callSignaturePosition).to.not.equal(undefined);
    });

    it("should have a call signature tags", () => {
      expect(callSignatureTags.children[0]).to.include("beta");
      expect(callSignatureTags.children[0]).to.include("deprecated");
    });

    it("should have a matching property description", () => {
      expect(propertyDescription.children[0]).to.equal("Property description");
    });

    it("should have a matching property remarks", () => {
      expect(propertyRemarks.children[0]).to.equal("Property remarks");
    });

    it("should have a matching property example", () => {
      expect(propertyExample.children[0]).to.equal("Property example");
    });

    it("should have a property tags", () => {
      expect(propertyTags.children[0]).to.include("beta");
      expect(propertyTags.children[0]).to.include("deprecated");
    });

  }

});
