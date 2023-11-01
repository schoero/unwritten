import { assert, expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/type";
import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { isJSDocText } from "unwritten:typeguards/jsdoc";
import { ts } from "unwritten:utils/template";


scope("Interpreter", TypeKind.Class, () => {

  {

    const testFileContent = ts`
      class Class {
      }
      export type ClassType = InstanceType<typeof Class>;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "ClassType")!;
    const exportedClassType = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse a class type", () => {
      assert(exportedClassType.type.kind === TypeKind.TypeReference);
      expect(exportedClassType.type.type!.kind).toBe(TypeKind.Class);
    });

  }

  {

    const testFileContent = ts`
      class Class {
        public property: string = "test";
      }
      export type ClassType = InstanceType<typeof Class>;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "ClassType")!;
    const exportedClassType = createTypeAliasEntity(ctx, symbol);

    it("should have one property", () => {
      assert(exportedClassType.type.kind === TypeKind.TypeReference);
      assert(exportedClassType.type.type!.kind === TypeKind.Class);
      expect(exportedClassType.type.type.properties).toHaveLength(1);
    });

  }

  {

    const testFileContent = ts`
      class Class {
        /**
         * Event description
         * @eventProperty
         */
        event;
      }
      export type ClassType = InstanceType<typeof Class>;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "ClassType")!;
    const exportedClassType = createTypeAliasEntity(ctx, symbol);

    it("should have one property", () => {
      assert(exportedClassType.type.kind === TypeKind.TypeReference);
      assert(exportedClassType.type.type?.kind === TypeKind.Class);

      expect(exportedClassType.type.type.events).toBeDefined();
      expect(exportedClassType.type.type.events).toHaveLength(1);
      expect(exportedClassType.type.type.events[0].name).toBe("event");

      assert(isJSDocText(exportedClassType.type.type.events[0].description![0]));
      expect(exportedClassType.type.type.events[0].description![0].text).toBe("Event description");

      expect(exportedClassType.type.type.properties).toHaveLength(0);
    });

  }

});
