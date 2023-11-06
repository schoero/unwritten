import ts from "typescript";

import { getDefaultConfig } from "unwritten:config/config";
import fs from "unwritten:platform/file-system/browser";
import { logger } from "unwritten:platform/logger/node";
import os from "unwritten:platform/os/node";
import path from "unwritten:platform/path/browser";
import process from "unwritten:platform/process/browser";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import jsonRenderer from "unwritten:renderer:json/index";
import htmlRenderer, { isHTMLRenderContext } from "unwritten:renderer:markup/html/index";
import markdownRenderer, { isMarkdownRenderContext } from "unwritten:renderer:markup/markdown/index";
import { attachTestRegistry } from "unwritten:tests:utils/registry";
import { createContext as createDefaultContext } from "unwritten:utils/context";
import { assert } from "unwritten:utils/general";
import { override } from "unwritten:utils:override";

import type { JSONRenderContext } from "unwritten:renderer:json/type-definitions/renderer";
import type { HTMLRenderContext, MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { CompleteConfig } from "unwritten:type-definitions/config";
import type { RenderContext } from "unwritten:type-definitions/context";


const testConfig: CompleteConfig = override(getDefaultConfig(), {
  externalTypes: {},
  renderConfig: {
    [BuiltInRenderers.HTML]: {
      parameterEncapsulation: false,
      propertyEncapsulation: false,
      renderEntityPrefixes: false,
      tagEncapsulation: false,
      typeEncapsulation: false,
      typeParameterEncapsulation: ["<", ">"]
    },
    [BuiltInRenderers.Markdown]: {
      parameterEncapsulation: false,
      propertyEncapsulation: false,
      renderEntityPrefixes: false,
      tagEncapsulation: false,
      typeEncapsulation: false,
      typeParameterEncapsulation: ["<", ">"]
    }
  }
});


export function createRenderContext(rendererName?: BuiltInRenderers.HTML): HTMLRenderContext;
export function createRenderContext(rendererName?: BuiltInRenderers.Markdown): MarkdownRenderContext;
export function createRenderContext(rendererName?: BuiltInRenderers.JSON): JSONRenderContext;
export function createRenderContext(rendererName: BuiltInRenderers = BuiltInRenderers.HTML): RenderContext {

  const defaultContext = createDefaultContext({
    fs,
    logger,
    os,
    path,
    process,
    ts
  });

  const ctx: RenderContext = {
    ...defaultContext,
    config: JSON.parse(JSON.stringify(testConfig)),
    renderer: htmlRenderer
  };

  if(rendererName === BuiltInRenderers.HTML){
    ctx.renderer = htmlRenderer;
    assert(isHTMLRenderContext(ctx));
    ctx.renderer.initializeContext(ctx);
    void attachTestRegistry(ctx);
    ctx.currentFile = ctx.links.at(0)!;
  } else if(rendererName === BuiltInRenderers.Markdown){
    ctx.renderer = markdownRenderer;
    assert(isMarkdownRenderContext(ctx));
    ctx.renderer.initializeContext(ctx);
    void attachTestRegistry(ctx);
    ctx.currentFile = ctx.links.at(0)!;
  } else {
    ctx.renderer = jsonRenderer;
  }

  return ctx;

}
