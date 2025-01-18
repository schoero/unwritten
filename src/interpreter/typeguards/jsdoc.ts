import type {
  JSDoc,
  JSDocComment,
  JSDocLink,
  JSDocLinkCode,
  JSDocLinkPlain,
  JSDocSeeTag,
  JSDocTag,
  JSDocText,
  JSDocThrowsTag
} from "typescript";
import type { InterpreterContext } from "unwritten:type-definitions/context";


export function isJSDoc(ctx: InterpreterContext, jsdoc: JSDoc | JSDocTag): jsdoc is JSDoc {
  const { ts } = ctx.dependencies;
  return ts.isJSDoc(jsdoc);
}

export function isJSDocLink(ctx: InterpreterContext, jsdocComment: JSDocComment): jsdocComment is JSDocLink {
  const { ts } = ctx.dependencies;
  return ts.isJSDocLink(jsdocComment);
}

export function isJSDocLinkCode(ctx: InterpreterContext, jsdocComment: JSDocComment): jsdocComment is JSDocLinkCode {
  const { ts } = ctx.dependencies;
  return ts.isJSDocLinkCode(jsdocComment);
}

export function isJSDocLinkPlain(ctx: InterpreterContext, jsdocComment: JSDocComment): jsdocComment is JSDocLinkPlain {
  const { ts } = ctx.dependencies;
  return ts.isJSDocLinkPlain(jsdocComment);
}

export function isJSDocSeeTag(ctx: InterpreterContext, jsdoc: JSDoc | JSDocTag): jsdoc is JSDocSeeTag {
  const { ts } = ctx.dependencies;
  return ts.isJSDocSeeTag(jsdoc);
}

export function isJSDocTag(ctx: InterpreterContext, jsdoc: JSDoc | JSDocTag): jsdoc is JSDocTag {
  return !isJSDoc(ctx, jsdoc);
}

export function isJSDocText(ctx: InterpreterContext, jsdocComment: JSDocComment): jsdocComment is JSDocText {
  const { ts } = ctx.dependencies;
  return jsdocComment.kind === ts.SyntaxKind.JSDocText;
}

export function isJSDocThrowsTag(ctx: InterpreterContext, jsdoc: JSDoc | JSDocTag): jsdoc is JSDocThrowsTag {
  const { ts } = ctx.dependencies;
  return ts.isJSDocThrowsTag(jsdoc);
}
