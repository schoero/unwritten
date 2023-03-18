import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import {
  convertEnumEntityForDocumentation,
  convertEnumEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/enum.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { EnumEntity } from "unwritten:interpreter:type-definitions/entities.js";
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

    const ctx = createRenderContext();

    const convertedEnumEntityForTableOfContents = convertEnumEntityForTableOfContents(ctx, enumEntity as EnumEntity);
    const convertedEnumEntityForDocumentation = convertEnumEntityForDocumentation(ctx, enumEntity as EnumEntity);

    const [
      position,
      tags,
      description,
      remarks,
      example,
      members
    ] = convertedEnumEntityForDocumentation.children;

    it("should have a matching name", () => {
      expect(convertedEnumEntityForTableOfContents.children).to.equal("Enum");
      expect(convertedEnumEntityForDocumentation.title).to.equal("Enum");
    });

    it("should have a position", () => {
      expect(position).to.not.equal(undefined);
    });

    it("should have matching tags", () => {
      expect(tags.children[0]).to.include("beta");
      expect(tags.children[0]).to.include("deprecated");
    });

    it("should have a matching description", () => {
      expect(description.children[0]).to.equal("Enum description");
    });

    it("should have a matching remarks", () => {
      expect(remarks.children[0]).to.equal("Enum remarks");
    });

    it("should have a matching example", () => {
      expect(example.children[0]).to.equal("Enum example");
    });

    it("should have matching members", () => {
      expect(members.children[0]).to.deep.equal(["A", "0", "A description"]);
      expect(members.children[1]).to.deep.equal(["B", "1", ""]);
      expect(members.children[2]).to.deep.equal(["C", "2", ""]);
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

    const ctx = createRenderContext();

    const convertedEnumEntityForDocumentation = convertEnumEntityForDocumentation(ctx, enumEntity as EnumEntity);

    const [
      position,
      tags,
      description,
      remarks,
      example,
      members
    ] = convertedEnumEntityForDocumentation.children;

    it("should have string literal enumerated members", () => {
      expect(members.children[0]).to.deep.equal(["A", ['"', "A", '"'], ""]);
      expect(members.children[1]).to.deep.equal(["B", ['"', "B", '"'], ""]);
      expect(members.children[2]).to.deep.equal(["C", ['"', "C", '"'], ""]);
    });

  }

});
