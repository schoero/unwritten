import { assert, expect, it } from "vitest";

import { createClassEntity } from "unwritten:interpreter:ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Interpreter", TypeKind.Expression, () => {

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
      assert(exportedClass.heritage!.instanceType.kind === TypeKind.Object);
      expect(exportedClass.heritage!.instanceType.properties).to.not.equal(undefined);
      expect(exportedClass.heritage!.instanceType.properties).to.have.lengthOf(1);
      expect(exportedClass.heritage!.instanceType.properties[0].type.kind).to.equal(TypeKind.StringLiteral);
    });

  }

  {

    const testFileContent = ts`
      class Base {
        public memberProp?: string;
      }

      class Base2 {
        static staticProp?: string;
      }

      function getBase() {
        return Math.random() > 0.5 ? Base2 : Base;
      }

      export class Class extends getBase() {}
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    // TypeScript doesn't support inferring from a union of classes yet
    it.skip("should be able to parse call expressions", () => {
      expect(exportedClass.heritage).to.not.equal(undefined);
      expect(exportedClass.heritage!.kind).to.equal(TypeKind.Expression);
      assert(exportedClass.heritage!.instanceType.kind === TypeKind.Union);
      assert(exportedClass.heritage!.staticType.kind === TypeKind.Union);
      expect(exportedClass.heritage!.instanceType.types).to.have.lengthOf(2);
      expect(exportedClass.heritage!.staticType.types).to.have.lengthOf(2);
    });

  }

  {

    const testFileContent = ts`
      class Base {
        prop?: string;
      }

      class Base2 {
        prop?: number;
      }

      interface Bases {
        prop?: string | number;
      }

      interface BasesConstructor {
        new (): Bases;
      }

      function getBase(): BasesConstructor {
        return Math.random() >= 0.5 ? Base : Base2;
      }

      export class Class extends getBase() {}
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should be able to parse call expressions", () => {
      expect(exportedClass.heritage).to.not.equal(undefined);
      expect(exportedClass.heritage!.kind).to.equal(TypeKind.Expression);
      assert(exportedClass.heritage!.instanceType.kind === TypeKind.Interface);
      assert(exportedClass.heritage!.staticType.kind === TypeKind.Interface);
      expect(exportedClass.heritage!.instanceType.properties).to.have.lengthOf(1);
      expect(exportedClass.heritage!.staticType.properties).to.have.lengthOf(0);
      expect(exportedClass.heritage!.instanceType.properties[0].type.kind).to.equal(TypeKind.Union);
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
      assert(exportedClass.heritage!.instanceType.kind === TypeKind.Object);
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
      assert(exportedClass.heritage!.staticType.kind === TypeKind.Object);
      expect(exportedClass.heritage!.staticType.properties).to.not.equal(undefined);
      expect(exportedClass.heritage!.staticType.properties).to.have.lengthOf(1);
      expect(exportedClass.heritage!.staticType.properties[0].type.kind).to.equal(TypeKind.String);

      expect(exportedClass.heritage!.instanceType).to.not.equal(undefined);
      assert(exportedClass.heritage!.instanceType.kind === TypeKind.Object);
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
      assert(exportedClass.heritage!.staticType.kind === TypeKind.Object);
      expect(exportedClass.heritage!.staticType.properties).to.not.equal(undefined);
      expect(exportedClass.heritage!.staticType.properties).to.have.lengthOf(1);
      expect(exportedClass.heritage!.staticType.properties[0].type.kind).to.equal(TypeKind.String);

      expect(exportedClass.heritage!.instanceType).to.not.equal(undefined);
      assert(exportedClass.heritage!.instanceType.kind === TypeKind.Object);
      expect(exportedClass.heritage!.instanceType.properties).to.not.equal(undefined);
      expect(exportedClass.heritage!.instanceType.properties).to.have.lengthOf(1);
      expect(exportedClass.heritage!.instanceType.properties[0].type.kind).to.equal(TypeKind.String);
    });

  }

});
