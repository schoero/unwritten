import ts from "typescript";

import { getDefaultConfig } from "unwritten:config/config";
import { logger } from "unwritten:platform/logger/node";
import os from "unwritten:platform/os/node";
import path from "unwritten:platform/path/browser";
import process from "unwritten:platform/process/browser";
import jsonRenderer from "unwritten:renderer:json:index";
import htmlRenderer, { isHTMLRenderContext } from "unwritten:renderer:markup/html/index";
import markdownRenderer, { isMarkdownRenderContext } from "unwritten:renderer:markup/markdown/index";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { attachTestRegistry } from "unwritten:tests:utils/registry";
import * as fs from "unwritten:tests:utils/virtual-fs";
import { override } from "unwritten:utils:override";
import { createContext as createDefaultContext } from "unwritten:utils/context";
import { assert } from "unwritten:utils/general";

import type { JSONRenderContext } from "unwritten:renderer:json:type-definitions/renderer";
import type {
  HTMLRenderNodeContext,
  MarkdownRenderNodeContext
} from "unwritten:renderer:markup/types-definitions/markup";
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
      typeArgumentEncapsulation: ["<", ">"],
      typeEncapsulation: false,
      typeParameterEncapsulation: ["<", ">"]
    },
    [BuiltInRenderers.Markdown]: {
      parameterEncapsulation: false,
      propertyEncapsulation: false,
      renderEntityPrefixes: false,
      tagEncapsulation: false,
      typeArgumentEncapsulation: ["<", ">"],
      typeEncapsulation: false,
      typeParameterEncapsulation: ["<", ">"]
    }
  }
});


export function createRenderContext(): HTMLRenderNodeContext;
export function createRenderContext(rendererName: BuiltInRenderers.HTML, useTestConfig?: boolean): HTMLRenderNodeContext;
export function createRenderContext(rendererName: BuiltInRenderers.Markdown, useTestConfig?: boolean): MarkdownRenderNodeContext;
export function createRenderContext(rendererName: BuiltInRenderers.JSON, useTestConfig?: boolean): JSONRenderContext;
export function createRenderContext(rendererName: BuiltInRenderers = BuiltInRenderers.HTML, useTestConfig: boolean = true): RenderContext {

  const defaultContext = createDefaultContext({
    fs,
    logger,
    os,
    path,
    process,
    ts
  });

  switch (rendererName){
    case BuiltInRenderers.HTML: {

      const ctx = {
        ...defaultContext,
        config: structuredClone(useTestConfig ? testConfig : getDefaultConfig()),
        renderer: htmlRenderer
      } satisfies RenderContext;

      assert(isHTMLRenderContext(ctx));
      ctx.renderer.initializeContext(ctx);
      void attachTestRegistry(ctx);
      ctx.currentFile = ctx.links.at(0)!;

      return ctx;
    }
    case BuiltInRenderers.Markdown: {

      const ctx = {
        ...defaultContext,
        config: structuredClone(useTestConfig ? testConfig : getDefaultConfig()),
        renderer: markdownRenderer
      } satisfies RenderContext;

      assert(isMarkdownRenderContext(ctx));
      ctx.renderer.initializeContext(ctx);
      void attachTestRegistry(ctx);
      ctx.currentFile = ctx.links.at(0)!;

      return ctx;
    }
    case BuiltInRenderers.JSON: {

      const ctx = {
        ...defaultContext,
        config: structuredClone(useTestConfig ? testConfig : getDefaultConfig()),
        renderer: jsonRenderer
      } satisfies RenderContext;

      return ctx;
    }
  }

}
