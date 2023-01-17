import { assert, expect, it } from "vitest";

import { createClassEntity } from "quickdoks:compiler:entities";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";


scope("Compiler", TypeKind.Expression, () => {

  {

    const testFileContent = ts`
      class Base {
      }
      export class Class extends Base {
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

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
    const exportedClass = createClassEntity(ctx, symbol);

    it("should support type arguments", () => {
      expect(exportedClass.heritage).to.not.equal(undefined);
      expect(exportedClass.heritage!.typeArguments).to.not.equal(undefined);
      expect(exportedClass.heritage!.typeArguments).to.have.lengthOf(1);
      expect(exportedClass.heritage!.typeArguments![0]!.kind).to.equal(TypeKind.StringLiteral);
    });

    it("should resolve type parameters with the supplied type arguments", () => {
      expect(exportedClass.heritage).to.not.equal(undefined);
      assert(exportedClass.heritage!.instanceType.kind === TypeKind.ObjectType);
      expect(exportedClass.heritage!.instanceType.properties).to.not.equal(undefined);
      expect(exportedClass.heritage!.instanceType.properties).to.have.lengthOf(1);
      expect(exportedClass.heritage!.instanceType.properties[0].type.kind).to.equal(TypeKind.StringLiteral);
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
    const exportedClass = createClassEntity(ctx, symbol);

    it("should be able to parse call expressions", () => {
      expect(exportedClass.heritage).to.not.equal(undefined);
      expect(exportedClass.heritage!.kind).to.equal(TypeKind.Expression);
      expect(exportedClass.heritage!.instanceType.kind).to.equal(TypeKind.ObjectType);
      expect(exportedClass.heritage!.staticType.kind).to.equal(TypeKind.ObjectType);
      expect(exportedClass.heritage!.name).to.equal("Base");
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
      export class Class extends getBase()<"test"> {
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should be able to resolve type parameters with the supplied type arguments via an expression", () => {
      expect(exportedClass.heritage).to.not.equal(undefined);
      assert(exportedClass.heritage!.instanceType.kind === TypeKind.ObjectType);
      expect(exportedClass.heritage!.instanceType.properties).to.not.equal(undefined);
      expect(exportedClass.heritage!.instanceType.properties).to.have.lengthOf(1);
      expect(exportedClass.heritage!.instanceType.properties[0].type.kind).to.equal(TypeKind.StringLiteral);
    });

  }

  {

    const testFileContent = ts`
      class Base {
        static staticProp: string;
        public memberProp: string = "test";
      }
      function getBase() {
        return Base;
      }
      export class Class extends getBase() {
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should resolve static and member properties when extended via call expression", () => {
      expect(exportedClass.heritage).to.not.equal(undefined);
      expect(exportedClass.heritage!.staticType).to.not.equal(undefined);
      assert(exportedClass.heritage!.staticType.kind === TypeKind.ObjectType);
      expect(exportedClass.heritage!.staticType.properties).to.not.equal(undefined);
      expect(exportedClass.heritage!.staticType.properties).to.have.lengthOf(1);
      expect(exportedClass.heritage!.staticType.properties[0].type.kind).to.equal(TypeKind.String);

      expect(exportedClass.heritage!.instanceType).to.not.equal(undefined);
      assert(exportedClass.heritage!.instanceType.kind === TypeKind.ObjectType);
      expect(exportedClass.heritage!.instanceType.properties).to.not.equal(undefined);
      expect(exportedClass.heritage!.instanceType.properties).to.have.lengthOf(1);
      expect(exportedClass.heritage!.instanceType.properties[0].type.kind).to.equal(TypeKind.String);
    });

  }

  {

    const testFileContent = ts`
      class Base {
        static staticProp: string;
        public memberProp: string = "Test";
      }
      export class Class extends Base {
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should resolve static and member properties when extended directly", () => {
      expect(exportedClass.heritage).to.not.equal(undefined);
      expect(exportedClass.heritage!.staticType).to.not.equal(undefined);
      assert(exportedClass.heritage!.staticType.kind === TypeKind.ObjectType);
      expect(exportedClass.heritage!.staticType.properties).to.not.equal(undefined);
      expect(exportedClass.heritage!.staticType.properties).to.have.lengthOf(1);
      expect(exportedClass.heritage!.staticType.properties[0].type.kind).to.equal(TypeKind.String);

      expect(exportedClass.heritage!.instanceType).to.not.equal(undefined);
      assert(exportedClass.heritage!.instanceType.kind === TypeKind.ObjectType);
      expect(exportedClass.heritage!.instanceType.properties).to.not.equal(undefined);
      expect(exportedClass.heritage!.instanceType.properties).to.have.lengthOf(1);
      expect(exportedClass.heritage!.instanceType.properties[0].type.kind).to.equal(TypeKind.String);
    });

  }

});
