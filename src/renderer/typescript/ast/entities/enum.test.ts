import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderEnumEntity } from "unwritten:renderer/typescript/ast/entities/enum.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { EnumEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", EntityKind.Enum, () => {

  {

    // #region Normal Enum with JSDoc tags and auto enumerated members

    // #region Source

    // /**
    //  * Enum description
    //  *
    //  * @remarks Enum remarks
    //  * @example Enum example
    //  * @deprecated
    //  * @beta
    //  */
    // export enum Enum {
    //   /**
    //    * A description
    //    *
    //    * @beta
    //    */
    //   A,
    //   B,
    //   C
    // }

    // #endregion

    const enumEntity: Testable<EnumEntity> = {
      beta: undefined,
      deprecated: undefined,
      description: "Enum description",
      example: "Enum example",
      id: 4053,
      kind: EntityKind.Enum,
      members: [
        {
          beta: undefined,
          description: "A description",
          id: 4456,
          kind: EntityKind.EnumMember,
          name: "A",
          position: {
            column: 2,
            file: "/file.ts",
            line: 15
          },
          type: {
            id: 2612,
            kind: TypeKind.NumberLiteral,
            name: "number",
            value: 0
          }
        },
        {
          description: undefined,
          id: 4457,
          kind: EntityKind.EnumMember,
          name: "B",
          position: {
            column: 2,
            file: "/file.ts",
            line: 16
          },
          type: {
            id: 2614,
            kind: TypeKind.NumberLiteral,
            name: "number",
            value: 1
          }
        },
        {
          description: undefined,
          id: 4458,
          kind: EntityKind.EnumMember,
          name: "C",
          position: {
            column: 2,
            file: "/file.ts",
            line: 17
          },
          type: {
            id: 2616,
            kind: TypeKind.NumberLiteral,
            name: "number",
            value: 2
          }
        }
      ],
      name: "Enum",
      position: {
        column: 0,
        file: "/file.ts",
        line: 9
      },
      remarks: "Enum remarks"
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedEnumEntity = renderEnumEntity(ctx, enumEntity as EnumEntity);

    const renderedEnumEntityLines = renderedEnumEntity.split(renderNewLine(ctx));

    it("should have a matching header", () => {
      expect(renderedEnumEntityLines[0]).to.equal("enum Enum {");
    });

    it("should have matching members", () => {
      expect(renderedEnumEntityLines[1].trim()).to.equal("A = 0,");
      expect(renderedEnumEntityLines[2].trim()).to.equal("B = 1,");
      expect(renderedEnumEntityLines[3].trim()).to.equal("C = 2");
    });

    it("should have a matching footer", () => {
      expect(renderedEnumEntityLines[4]).to.equal("}");
    });

  }

  {

    // #region Enum with string literal enumerated members

    // #region Source

    // export enum Enum {
    //   A = "A",
    //   B = "B",
    //   C = "C"
    // }

    // #endregion

    const enumEntity: Testable<EnumEntity> = {
      description: undefined,
      id: 4052,
      kind: EntityKind.Enum,
      members: [
        {
          description: undefined,
          id: 4456,
          kind: EntityKind.EnumMember,
          name: "A",
          position: {
            column: 2,
            file: "/file.ts",
            line: 2
          },
          type: {
            id: 2612,
            kind: TypeKind.StringLiteral,
            name: "string",
            value: "A"
          }
        },
        {
          description: undefined,
          id: 4457,
          kind: EntityKind.EnumMember,
          name: "B",
          position: {
            column: 2,
            file: "/file.ts",
            line: 3
          },
          type: {
            id: 2614,
            kind: TypeKind.StringLiteral,
            name: "string",
            value: "B"
          }
        },
        {
          description: undefined,
          id: 4458,
          kind: EntityKind.EnumMember,
          name: "C",
          position: {
            column: 2,
            file: "/file.ts",
            line: 4
          },
          type: {
            id: 2616,
            kind: TypeKind.StringLiteral,
            name: "string",
            value: "C"
          }
        }
      ],
      name: "Enum",
      position: {
        column: 0,
        file: "/file.ts",
        line: 1
      }
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedEnumEntity = renderEnumEntity(ctx, enumEntity as EnumEntity);

    const renderedEnumEntityLines = renderedEnumEntity.split(renderNewLine(ctx));

    it("should have string literal enumerated members", () => {
      expect(renderedEnumEntityLines[1].trim()).to.equal('A = "A",');
      expect(renderedEnumEntityLines[2].trim()).to.equal('B = "B",');
      expect(renderedEnumEntityLines[3].trim()).to.equal('C = "C"');
    });

  }

});
