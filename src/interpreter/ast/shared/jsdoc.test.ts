import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createClassEntity, createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", "JSDoc", () => {

  {

    const testFileContent = ts`
      /**
       * Type description
       * 
       * @remarks This is a longer description.
       * @alpha This type is in alpha.
       * @beta This type is in beta.
       * @internal This type is internal.
       * @deprecated This type is deprecated.
       */
      export type Test = true;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have matching standart JSDoc tags", () => {
      expect(exportedTypeAlias.description).toBe("Type description");
      expect(exportedTypeAlias.remarks).toBe("This is a longer description.");
      expect(exportedTypeAlias.alpha).toBe("This type is in alpha.");
      expect(exportedTypeAlias.beta).toBe("This type is in beta.");
      expect(exportedTypeAlias.internal).toBe("This type is internal.");
      expect(exportedTypeAlias.deprecated).toBe("This type is deprecated.");
    });

  }

  {

    const testFileContent = ts`
      /**
       * @example example
       */
      export type Test = true;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should support a single line example with just text", () => {
      assert(Array.isArray(exportedTypeAlias.example));
      expect(exportedTypeAlias.example).toHaveLength(1);
      expect(exportedTypeAlias.example[0]).toBe("example");
    });

  }

  {

    const testFileContent = ts`
      /**
       * @example example 1
       * @example example 2
       */
      export type Test = true;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should support multiple single line examples with just text", () => {
      assert(Array.isArray(exportedTypeAlias.example));
      expect(exportedTypeAlias.example).toHaveLength(2);
      expect(exportedTypeAlias.example[0]).toBe("example 1");
      expect(exportedTypeAlias.example[1]).toBe("example 2");
    });

  }

  {

    const testFileContent = ts`
      /**
       * @example example 1
       * \`\`\`ts
       * export type Test = true;
       * \`\`\`
       * @example example 2
       * \`\`\`ts
       * export type Test = true;
       * \`\`\`
       */
      export type Test = true;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should support multiple examples with markdown", () => {
      assert(Array.isArray(exportedTypeAlias.example));
      expect(exportedTypeAlias.example).toHaveLength(2);
      expect(exportedTypeAlias.example[0]).toContain("example 1");
      expect(exportedTypeAlias.example[0]).toContain("export type Test = true;");
      expect(exportedTypeAlias.example[1]).toContain("example 2");
      expect(exportedTypeAlias.example[1]).toContain("export type Test = true;");
    });

  }

  {

    const testFileContent = ts`
      /**
       * @throws This may throw an error.
       */
      export type Test = true;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should support the throws tag with just a description", () => {
      expect(exportedTypeAlias.throws).toBeDefined();
      expect(exportedTypeAlias.throws).toHaveLength(1);
      expect(exportedTypeAlias.throws![0].description).toBe("This may throw an error.");
    });

  }

  {

    const testFileContent = ts`
      /**
       * @throws This may throw an error.
       * @throws This may throw another error.
       */
      export type Test = true;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should support multiple throws tag with just a description", () => {
      expect(exportedTypeAlias.throws).toBeDefined();
      expect(exportedTypeAlias.throws).toHaveLength(2);
      expect(exportedTypeAlias.throws![0].description).toBe("This may throw an error.");
      expect(exportedTypeAlias.throws![1].description).toBe("This may throw another error.");
    });

  }

  {

    const testFileContent = ts`
      /**
       * @throws { Error } This may throw an error.
       * @throws { RangeError } This may throw a range error.
       */
      export type Test = true;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should support the throws tag with multiple types", () => {
      expect(exportedTypeAlias.throws).toBeDefined();
      expect(exportedTypeAlias.throws).toHaveLength(2);
      expect(exportedTypeAlias.throws![0].description).toBe("This may throw an error.");
      expect(exportedTypeAlias.throws![0].type).toBeDefined();
      assert(exportedTypeAlias.throws![0].type?.kind === TypeKind.TypeReference);
      expect(exportedTypeAlias.throws![0].type.name).toBe("Error");
      expect(exportedTypeAlias.throws![1].description).toBe("This may throw a range error.");
      assert(exportedTypeAlias.throws![1].type?.kind === TypeKind.TypeReference);
      expect(exportedTypeAlias.throws![1].type.name).toBe("RangeError");
    });

  }

  {

    const testFileContent = ts`
      export class Class {
        /**
         * Event description
         * @remarks Event remarks
         * @example Event example
         * @eventProperty
         */
        event;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should support events", () => {
      expect(exportedClass.events).toBeDefined();
      expect(exportedClass.events).toHaveLength(1);
      expect(exportedClass.events[0].description).toBe("Event description");
      expect(exportedClass.events[0].remarks).toBe("Event remarks");
      expect(exportedClass.events[0].example).toStrictEqual([
        "Event example"
      ]);
    });

  }

});
