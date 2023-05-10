import { ASTNodeKinds } from "../enums/nodes.js";

import type {
  AnchorNode,
  ASTNodes,
  BoldNode,
  ItalicNode,
  LinkNode,
  ListNode,
  ParagraphNode,
  SectionNode,
  SmallNode,
  SpanNode,
  StrikethroughNode,
  TitleNode
} from "../types-definitions/nodes.js";


export function isAnchorNode(node: ASTNodes): node is AnchorNode {
  return typeof node === "object" && !Array.isArray(node) &&
  node.kind === ASTNodeKinds.Anchor;
}

export function isBoldNode(node: ASTNodes): node is BoldNode {
  return typeof node === "object" && !Array.isArray(node) &&
      node.kind === ASTNodeKinds.Bold;
}

export function isItalicNode(node: ASTNodes): node is ItalicNode {
  return typeof node === "object" && !Array.isArray(node) &&
      node.kind === ASTNodeKinds.Italic;
}

export function isLinkNode(node: ASTNodes): node is LinkNode {
  return typeof node === "object" && !Array.isArray(node) &&
     node.kind === ASTNodeKinds.Link;
}

export function isListNode(node: ASTNodes): node is ListNode {
  return typeof node === "object" && !Array.isArray(node) &&
     node.kind === ASTNodeKinds.List;
}

export function isParagraphNode(node: ASTNodes): node is ParagraphNode {
  return typeof node === "object" && !Array.isArray(node) &&
     node.kind === ASTNodeKinds.Paragraph;
}

export function isSectionNode(node: ASTNodes): node is SectionNode {
  return typeof node === "object" && !Array.isArray(node) &&
     node.kind === ASTNodeKinds.Section;
}

export function isSmallNode(node: ASTNodes): node is SmallNode {
  return typeof node === "object" && !Array.isArray(node) &&
     node.kind === ASTNodeKinds.Small;
}

export function isSpanNode(node: ASTNodes): node is SpanNode {
  return typeof node === "object" && !Array.isArray(node) &&
      node.kind === ASTNodeKinds.Span;
}

export function isStrikethroughNode(node: ASTNodes): node is StrikethroughNode {
  return typeof node === "object" && !Array.isArray(node) &&
      node.kind === ASTNodeKinds.Strikethrough;
}

export function isTitleNode(node: ASTNodes): node is TitleNode {
  return typeof node === "object" && !Array.isArray(node) &&
     node.kind === ASTNodeKinds.Title;
}
