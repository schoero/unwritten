import { JSDocKind } from "unwritten:interpreter/enums/jsdoc.js";

import type {
  JSDocGenericTag,
  JSDocLink,
  JSDocReference,
  JSDocSeeTag,
  JSDocTag,
  JSDocText,
  JSDocThrowsTag,
  JSDocType
} from "unwritten:interpreter/type-definitions/jsdoc.js";


export function isJSDocGenericTag(jsdocTag: JSDocTag): jsdocTag is JSDocGenericTag {
  return jsdocTag.kind === JSDocKind.Generic;
}

export function isJSDocLink(jsdocTag: JSDocTag): jsdocTag is JSDocLink {
  return jsdocTag.kind === JSDocKind.Link;
}

export function isJSDocReference(jsdocTag: JSDocTag): jsdocTag is JSDocReference {
  return jsdocTag.kind === JSDocKind.Reference;
}

export function isJSDocSeeTag(jsdocTag: JSDocTag): jsdocTag is JSDocSeeTag {
  return jsdocTag.kind === JSDocKind.See;
}

export function isJSDocText(jsdocTag: JSDocTag): jsdocTag is JSDocText {
  return jsdocTag.kind === JSDocKind.Text;
}

export function isJSDocThrowsTag(jsdocTag: JSDocTag): jsdocTag is JSDocThrowsTag {
  return jsdocTag.kind === JSDocKind.Throws;
}

export function isJSDocType(jsdocTag: JSDocTag): jsdocTag is JSDocType {
  return jsdocTag.kind === JSDocKind.Type;
}
