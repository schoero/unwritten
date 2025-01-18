import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index";
import { JSDocTagNames } from "unwritten:interpreter/enums/jsdoc";
import { convertDescriptionForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/description";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";
import { expect, it } from "vitest";


scope("MarkupRenderer", JSDocTagNames.Description, () => {

  const testFileContent = ts`
    /**
     * Line 1
     * Line 2
     */
    export type Test = true;
  `;

  const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

  const symbol = exportedSymbols.find(s => s.name === "Test")!;
  const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
  const ctx = createRenderContext();

  assert(typeAliasEntity.description);

  const convertedDescription = convertDescriptionForDocumentation(
    ctx,
    typeAliasEntity.description
  );

  assert(convertedDescription);

  const {
    children,
    title
  } = convertedDescription;

  it("should have a matching title", () => {
    expect(title).toBe("Description");
  });

  it("should have a matching description", () => {
    expect(children[0].children[0]).toBe("Line 1\nLine 2");
  });

});
