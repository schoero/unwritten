import { expect } from "chai";
import { describe, it } from "vitest";

import { renderClassForDocumentation, renderClassForTableOfContents } from "quickdoks:compiler:entities";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";

import type { Class } from "quickdoks:compiler:type-definitions/types.d.js";
import type { Real, Testable } from "quickdoks:compiler:type-definitions/utils.d.js";


describe("Renderer: Class", () => {
  {

    const testClass: Testable<Class> = {
      getters: [],
      kind: TypeKind.Class,
      methods: [],
      name: "Class",
      properties: [],
      setters: []
    };

    const ctx = createRenderContext();

    const renderedClassForTableOfContents = renderClassForTableOfContents(ctx, <Real<Class>>testClass);
    const renderedClassForDocumentation = renderClassForDocumentation(ctx, <Real<Class>>testClass);

    it("should render a class with the correct name", () => {
      expect(renderedClassForTableOfContents[0]).to.equal("Class");
      expect(Object.keys(renderedClassForDocumentation)).to.have.lengthOf(1);
      expect(Object.keys(renderedClassForDocumentation)[0]).to.equal("Class");
    });

    it("should habe no description", () => {
      expect(renderedClassForDocumentation.Class[0]).to.equal(undefined);
    });

    it("should habe no example", () => {
      expect(renderedClassForDocumentation.Class[1]).to.equal(undefined);
    });

    it("should have no constructor", () => {
      expect(renderedClassForDocumentation.Class[2]).to.equal(undefined);
    });

    it("should habe no members", () => {
      // Properties
      expect(renderedClassForDocumentation.Class[3]).to.equal(undefined);
      // Methods
      expect(renderedClassForDocumentation.Class[4]).to.equal(undefined);
      // Setters
      expect(renderedClassForDocumentation.Class[5]).to.equal(undefined);
      // Getters
      expect(renderedClassForDocumentation.Class[6]).to.equal(undefined);
    });

  }

  describe("Constructor", () => {

    const testClass: Testable<Class> = {
      ctor: {
        kind: TypeKind.Constructor,
        name: "constructor",
        signatures: [
          {
            kind: TypeKind.Signature,
            parameters: [],
            returnType: {
              kind: TypeKind.Instance,
              name: "Class"
            }
          }
        ]
      },
      getters: [],
      kind: TypeKind.Class,
      methods: [],
      name: "Class",
      properties: [],
      setters: []
    };

    const ctx = createRenderContext();

    const renderedClassForTableOfContents = renderClassForTableOfContents(ctx, <Real<Class>>testClass);
    const renderedClassForDocumentation = renderClassForDocumentation(ctx, <Real<Class>>testClass);

    it("should have a constructor", () => {
      expect(renderedClassForTableOfContents[1][0]).to.not.equal(undefined);
      expect(renderedClassForDocumentation.Class[2]).to.not.equal(undefined);
      // title
      expect(renderedClassForTableOfContents[1][0]![0][0]).to.equal("Constructor");
      expect(Object.keys(renderedClassForDocumentation.Class[2]!)[0]).to.equal("Constructor");
      // signatures
      expect(renderedClassForTableOfContents[1][0]![0][1][0]!).to.have.lengthOf(1);
      expect(Object.keys(renderedClassForDocumentation.Class[2]!)).to.have.lengthOf(1);
      expect(renderedClassForTableOfContents[1][0]![0][1][0]![0]).to.equal("constructor()");
      expect(Object.keys(renderedClassForDocumentation.Class[2]!.Constructor)).to.have.lengthOf(1);
      expect(Object.keys(renderedClassForDocumentation.Class[2]!.Constructor)[0]).to.equal("constructor()");
      // Return type
      expect(renderedClassForDocumentation.Class[2]!.Constructor["constructor()"]![0][0][0]).to.equal("Returns: Class");
    });

  });

  describe("Properties", () => {

    const testClass: Testable<Class> = {
      getters: [],
      kind: TypeKind.Class,
      methods: [],
      name: "Class",
      properties: [
        {
          kind: TypeKind.Property,
          name: "property",
          optional: false,
          type: {
            kind: TypeKind.String,
            name: "string"
          }
        }
      ],
      setters: []
    };

    const ctx = createRenderContext();

    const renderedClassForTableOfContents = renderClassForTableOfContents(ctx, <Real<Class>>testClass);
    const renderedClassForDocumentation = renderClassForDocumentation(ctx, <Real<Class>>testClass);

    it("should render properties correctly", () => {
      expect(renderedClassForTableOfContents[1][1]).to.not.equal(undefined);
      expect(renderedClassForDocumentation.Class[3]).to.not.equal(undefined);
      expect(renderedClassForTableOfContents[1][1]![0][0]).to.equal("Properties");
      expect(Object.keys(renderedClassForDocumentation.Class[3]!)[0]).to.equal("Properties");
      expect(renderedClassForTableOfContents[1][1]![0][1][0]![0]).to.equal("property");
      expect(renderedClassForDocumentation.Class[3]!.Properties).to.have.lengthOf(1);
      expect(renderedClassForDocumentation.Class[3]!.Properties[0]).to.equal("property: string");
    });

  });

  describe("Methods", () => {

    const testClass: Testable<Class> = {
      getters: [],
      kind: TypeKind.Class,
      methods: [
        {
          kind: TypeKind.Method,
          name: "meow",
          signatures: [
            {
              kind: TypeKind.Signature,
              parameters: [],
              returnType: {
                kind: TypeKind.Void,
                name: "void"
              }
            }
          ]
        }
      ],
      name: "Cat",
      properties: [],
      setters: []
    };

    const ctx = createRenderContext();

    const renderedClassForTableOfContents = renderClassForTableOfContents(ctx, <Real<Class>>testClass);
    const renderedClassForDocumentation = renderClassForDocumentation(ctx, <Real<Class>>testClass);

    it("should render methods correctly", () => {
      expect(renderedClassForTableOfContents[1][2]).to.not.equal(undefined);
      expect(renderedClassForDocumentation.Cat[4]).to.not.equal(undefined);
      expect(renderedClassForTableOfContents[1][2]![0][0]).to.equal("Methods");
      expect(Object.keys(renderedClassForDocumentation.Cat[4]!)[0]).to.equal("Methods");
      expect(renderedClassForTableOfContents[1][2]![0][1][0]![0]).to.equal("meow()");
      expect(renderedClassForDocumentation.Cat[4]!.Methods).to.have.lengthOf(1);
      expect(Object.keys(renderedClassForDocumentation.Cat[4]!.Methods[0]!)[0]).to.equal("meow()");
      expect(renderedClassForDocumentation.Cat[4]!.Methods[0]!["meow()"]![0][0][0]).to.equal("Returns: void");
    });

  });

});
