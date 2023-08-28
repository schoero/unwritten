import { ASTNodeKinds } from "../enums/nodes.js";

import type {
  AnchorNode,
  ASTNode,
  BoldNode,
  ConditionalNode,
  InlineTitleNode,
  ItalicNode,
  LinkNode,
  ListNode,
  MultilineNode,
  PaddedNode,
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

/**
 * Checks if a node is a block node. A block node is a node whose children are rendered on separate lines.
 * @param node The node to check
 * @returns `true` if the node is a block node, `false` otherwise
 */
export function isBlockNode(node: ASTNode): node is ListNode | MultilineNode | TitleNode {
  return isListNode(node) || isMultilineNode(node) || isTitleNode(node);
}

export function isBoldNode(node: ASTNode): node is BoldNode {
  return typeof node === "object" && !Array.isArray(node) &&
      node.kind === ASTNodeKinds.Bold;
}

export function isConditionalNode(node: ASTNode): node is ConditionalNode {
  return typeof node === "object" && !Array.isArray(node) &&
      node.kind === ASTNodeKinds.Conditional;
}

export function isInlineTitleNode(node: ASTNode): node is InlineTitleNode {
  return typeof node === "object" && !Array.isArray(node) &&
      node.kind === ASTNodeKinds.InlineTitle;
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

export function isMultilineNode(node: ASTNode): node is MultilineNode {
  return typeof node === "object" && !Array.isArray(node) &&
      node.kind === ASTNodeKinds.Multiline;
}

export function isPaddedNode(node: ASTNode): node is PaddedNode {
  return typeof node === "object" && !Array.isArray(node) &&
      node.kind === ASTNodeKinds.Padded;
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
