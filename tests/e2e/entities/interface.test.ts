import { expect, it } from "vitest";

import { createInterfaceEntity } from "unwritten:compiler:entities";
import { EntityKind } from "unwritten:compiler:enums/entities.js";
import {
  renderInterfaceForDocumentation,
  renderInterfaceForTableOfContents
} from "unwritten:renderer/markup/ast-converter/entities/interface.js";
import { renderAST } from "unwritten:renderer:markup/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("E2E", EntityKind.Interface, () => {

  {

    const testFileContent = ts`
      export interface Interface {
        /**
         * Interface description 
         * @param param - Parameter description
         * @example Interface example
         */
        (param: string): string;
      };
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceEntity(compilerContext, symbol);

    const renderContext = createRenderContext();
    const renderedInterfaceForTableOfContents = renderInterfaceForTableOfContents(renderContext, exportedInterface);
    const renderedInterfaceForDocumentation = renderInterfaceForDocumentation(renderContext, exportedInterface);

    const interfaceName = Object.keys(renderedInterfaceForDocumentation)[0]!;
    const interfaceContent = renderedInterfaceForDocumentation[interfaceName]!;

    const documentation = renderAST(renderContext, renderedInterfaceForDocumentation);

    it("should be able to parse an interface", () => {
      expect(documentation).to.equal(`
        <h1>Interface</h1>
      `);
    });

  }

});
