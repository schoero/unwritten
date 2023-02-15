import { ASTNodeKinds } from "../enums/nodes.js";

import type {
  AnchorNode,
  ASTNodes,
  ContainerNode,
  LinkNode,
  ListNode,
  ParagraphNode,
  SmallNode,
  TitleNode
} from "../types-definitions/nodes.js";


export function isAnchorNode(node: ASTNodes): node is AnchorNode {
  return typeof node === "object" &&
     node.kind === ASTNodeKinds.Anchor;
}

export function isContainerNode(node: ASTNodes): node is ContainerNode {
  return typeof node === "object" &&
     node.kind === ASTNodeKinds.Container;
}

export function isLinkNode(node: ASTNodes): node is LinkNode {
  return typeof node === "object" &&
     node.kind === ASTNodeKinds.Link;
}

export function isListNode(node: ASTNodes): node is ListNode {
  return typeof node === "object" &&
     node.kind === ASTNodeKinds.List;
}

export function isParagraphNode(node: ASTNodes): node is ParagraphNode {
  return typeof node === "object" &&
     node.kind === ASTNodeKinds.Paragraph;
}

export function isSmallNode(node: ASTNodes): node is SmallNode {
  return typeof node === "object" &&
     node.kind === ASTNodeKinds.Small;
}

export function isTitleNode(node: ASTNodes): node is TitleNode {
  return typeof node === "object" &&
     node.kind === ASTNodeKinds.Title;
}
