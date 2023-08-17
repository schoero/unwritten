import { ASTNodeKinds } from "../enums/nodes.js";

import type {
  AnchorNode,
  ASTNode,
  BoldNode,
  ConditionalNode,
  ItalicNode,
  LinkNode,
  ListNode,
  ParagraphNode,
  SectionNode,
  SmallNode,
  SpanNode,
  StrikethroughNode,
  TitleNode
} from "unwritten:renderer:markup/types-definitions/nodes.js";


export function isAnchorNode(node: ASTNode): node is AnchorNode {
  return typeof node === "object" && !Array.isArray(node) &&
  node.kind === ASTNodeKinds.Anchor;
}

export function isBoldNode(node: ASTNode): node is BoldNode {
  return typeof node === "object" && !Array.isArray(node) &&
      node.kind === ASTNodeKinds.Bold;
}

export function isConditionalNode(node: ASTNode): node is ConditionalNode {
  return typeof node === "object" && !Array.isArray(node) &&
      node.kind === ASTNodeKinds.Conditional;
}

export function isItalicNode(node: ASTNode): node is ItalicNode {
  return typeof node === "object" && !Array.isArray(node) &&
      node.kind === ASTNodeKinds.Italic;
}

export function isLinkNode(node: ASTNode): node is LinkNode {
  return typeof node === "object" && !Array.isArray(node) &&
     node.kind === ASTNodeKinds.Link;
}

export function isListNode(node: ASTNode): node is ListNode {
  return typeof node === "object" && !Array.isArray(node) &&
     node.kind === ASTNodeKinds.List;
}

export function isParagraphNode(node: ASTNode): node is ParagraphNode {
  return typeof node === "object" && !Array.isArray(node) &&
     node.kind === ASTNodeKinds.Paragraph;
}

export function isSectionNode(node: ASTNode): node is SectionNode {
  return typeof node === "object" && !Array.isArray(node) &&
     node.kind === ASTNodeKinds.Section;
}


export function isSmallNode(node: ASTNode): node is SmallNode {
  return typeof node === "object" && !Array.isArray(node) &&
     node.kind === ASTNodeKinds.Small;
}

export function isSpanNode(node: ASTNode): node is SpanNode {
  return typeof node === "object" && !Array.isArray(node) &&
      node.kind === ASTNodeKinds.Span;
}

export function isStrikethroughNode(node: ASTNode): node is StrikethroughNode {
  return typeof node === "object" && !Array.isArray(node) &&
      node.kind === ASTNodeKinds.Strikethrough;
}

export function isTitleNode(node: ASTNode): node is TitleNode {
  return typeof node === "object" && !Array.isArray(node) &&
     node.kind === ASTNodeKinds.Title;
}
