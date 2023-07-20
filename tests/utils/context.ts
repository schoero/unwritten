import ts from "typescript";

import { getDefaultConfig } from "unwritten:config/config.js";
import fs from "unwritten:platform/file-system/node.js";
import { logger } from "unwritten:platform/logger/node.js";
import os from "unwritten:platform/os/node.js";
import path from "unwritten:platform/path/node.js";
import process from "unwritten:platform/process/node.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import jsonRenderer from "unwritten:renderer:json/index.js";
import htmlRenderer, { isHTMLRenderContext } from "unwritten:renderer:markup/html/index.js";
import markdownRenderer, { isMarkdownRenderContext } from "unwritten:renderer:markup/markdown/index.js";
import { createContext as createDefaultContext } from "unwritten:utils/context.js";
import { assert } from "unwritten:utils/general.js";
import { override } from "unwritten:utils:override.js";

import type { JSONRenderContext } from "unwritten:renderer:json/type-definitions/renderer.js";
import type { HTMLRenderContext, MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { CompleteConfig } from "unwritten:type-definitions/config.js";
import type { RenderContext } from "unwritten:type-definitions/context.js";
import type { Renderer } from "unwritten:type-definitions/renderer.js";


const testConfig: CompleteConfig = override(getDefaultConfig(), {
  externalTypes: {},
  renderConfig: {
    html: {
      parameterEncapsulation: false,
      propertyEncapsulation: false,
      tagEncapsulation: false,
      typeEncapsulation: false,
      typeParameterEncapsulation: ["<", ">"]
    },
    md: {
      parameterEncapsulation: false,
      propertyEncapsulation: false,
      tagEncapsulation: false,
      typeEncapsulation: false,
      typeParameterEncapsulation: ["<", ">"]
    }
  }
});


export function createRenderContext(rendererName?: BuiltInRenderers.HTML): HTMLRenderContext;
export function createRenderContext(rendererName: BuiltInRenderers.Markdown): MarkdownRenderContext;
export function createRenderContext(rendererName: BuiltInRenderers.JSON): JSONRenderContext;
export function createRenderContext(rendererName: BuiltInRenderers = BuiltInRenderers.HTML): RenderContext<Renderer> {

  const defaultContext = createDefaultContext({
    fs,
    logger,
    os,
    path,
    process,
    ts
  });

  const ctx: RenderContext<Renderer> = {
    ...defaultContext,
    config: JSON.parse(JSON.stringify(testConfig)),
    renderer: htmlRenderer
  };

  if(rendererName === BuiltInRenderers.HTML){
    ctx.renderer = htmlRenderer;
    assert(isHTMLRenderContext(ctx));
    ctx.renderer.initializeContext(ctx);
  } else if(rendererName === BuiltInRenderers.Markdown){
    ctx.renderer = markdownRenderer;
    assert(isMarkdownRenderContext(ctx));
    ctx.renderer.initializeContext(ctx);
  } else {
    ctx.renderer = jsonRenderer;
  }

  return ctx;

}
