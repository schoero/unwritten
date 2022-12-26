import { expect, it } from "vitest";

import { createClassBySymbol } from "quickdoks:compiler:entities";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import { Kind, ObjectType } from "quickdoks:type-definitions/types.d.js";


scope("Compiler", Kind.Expression, () => {

  {

    const testFileContent = ts`
      class Base {
      }
      export class Class extends Base {
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should be able to parse expressions", () => {
      expect(exportedClass.heritage).to.not.equal(undefined);
      expect(exportedClass.heritage!.name).to.equal("Base");
    });

  }

  {

    const testFileContent = ts`
      export class Base<T> {
        prop: T;
      }
      export class Class extends Base<"Hello"> { }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should support type arguments", () => {
      expect(exportedClass.heritage).to.not.equal(undefined);
      expect(exportedClass.heritage!.typeArguments).to.not.equal(undefined);
      expect(exportedClass.heritage!.typeArguments).to.have.lengthOf(1);
      expect(exportedClass.heritage!.typeArguments![0].type.kind).to.equal(Kind.StringLiteral);
    });

    it("should resolve type parameters with the supplied type arguments", () => {
      expect(exportedClass.heritage).to.not.equal(undefined);
      expect((exportedClass.heritage!.type as ObjectType).properties).to.not.equal(undefined);
      expect((exportedClass.heritage!.type as ObjectType).properties).to.have.lengthOf(1);
      expect((exportedClass.heritage!.type as ObjectType).properties[0].type.kind).to.equal(Kind.StringLiteral);
    });

  }

  {

    const testFileContent = ts`
      class Base {
      }

      function getBase() {
          return Base
      }

      export class Class extends getBase() {
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should be able to parse expressions", () => {
      expect(exportedClass.heritage).to.not.equal(undefined);
      expect(exportedClass.heritage!.kind).to.equal(Kind.Expression);
    });

    it("should be able to parse expressions", () => {
      expect(exportedClass.heritage).to.not.equal(undefined);
      expect(exportedClass.heritage!.type.kind).to.equal(Kind.ObjectType);
    });

  }

  {

    const testFileContent = ts`
      class Base<T> {
        prop: T;
      }

      function getBase() {
        return Base;
      }

      export class Class extends getBase()<"Hello"> {
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should be able to resolve type parameters with the supplied type arguments via an expression", () => {
      expect(exportedClass.heritage).to.not.equal(undefined);
      expect((exportedClass.heritage!.type as ObjectType).properties).to.not.equal(undefined);
      expect((exportedClass.heritage!.type as ObjectType).properties).to.have.lengthOf(1);
      expect((exportedClass.heritage!.type as ObjectType).properties[0].type.kind).to.equal(Kind.StringLiteral);
    });

  }

});
