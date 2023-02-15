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


export function isAnchorNode(astElement: ASTNodes): astElement is AnchorNode {
  return typeof astElement === "object" &&
     astElement.kind === ASTNodeKinds.Anchor;
}

export function isContainerNode(astElement: ASTNodes): astElement is ContainerNode {
  return typeof astElement === "object" &&
     astElement.kind === ASTNodeKinds.Container;
}

export function isLinkNode(astElement: ASTNodes): astElement is LinkNode {
  return typeof astElement === "object" &&
     astElement.kind === ASTNodeKinds.Link;
}

export function isListNode(astElement: ASTNodes): astElement is ListNode {
  return typeof astElement === "object" &&
     astElement.kind === ASTNodeKinds.List;
}

export function isParagraphNode(astElement: ASTNodes): astElement is ParagraphNode {
  return typeof astElement === "object" &&
     astElement.kind === ASTNodeKinds.Paragraph;
}

export function isSmallNode(astElement: ASTNodes): astElement is SmallNode {
  return typeof astElement === "object" &&
     astElement.kind === ASTNodeKinds.Small;
}

export function isTitleNode(astElement: ASTNodes): astElement is TitleNode {
  return typeof astElement === "object" &&
     astElement.kind === ASTNodeKinds.Title;
}
