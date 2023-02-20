import { ASTNodeKinds } from "../enums/nodes.js";

import type {
  AnchorNode,
  ASTNodes,
  BoldNode,
  ItalicNode,
  LinkNode,
  ListNode,
  ParagraphNode,
  SmallNode,
  StrikethroughNode,
  TitleNode,
  WrapperNode
} from "../types-definitions/nodes.js";


export function createAnchorNode(children: string, id: string): AnchorNode {
  return {
    children,
    id,
    kind: ASTNodeKinds.Anchor
  };
}


export function createBoldNode(children: string): BoldNode {
  return {
    children,
    kind: ASTNodeKinds.Bold
  };
}

export function createContainerNode<T extends ASTNodes[]>(...children: T) {
  return {
    children,
    kind: ASTNodeKinds.Container
  } as const;
}

export function createItalicNode(children: string): ItalicNode {
  return {
    children,
    kind: ASTNodeKinds.Italic
  };
}

export function createLinkNode(children: string, link: string): LinkNode {
  return {
    children,
    kind: ASTNodeKinds.Link,
    link
  };
}

export function createListNode<T extends ASTNodes[]>(children: T): ListNode;
export function createListNode<T extends ASTNodes[]>(...children: T): ListNode;
export function createListNode<T extends ASTNodes[]>(...children: T): ListNode {
  return {
    children,
    kind: ASTNodeKinds.List
  };
}

export function createParagraphNode(children: string): ParagraphNode {
  return {
    children,
    kind: ASTNodeKinds.Paragraph
  };
}

export function createSmallNode(children: string): SmallNode {
  return {
    children,
    kind: ASTNodeKinds.Small
  };
}

export function createStrikethroughNode(children: string): StrikethroughNode {
  return {
    children,
    kind: ASTNodeKinds.Strikethrough
  };
}

export function createTitleNode<Children extends ASTNodes[]>(title: string, id: string | undefined, children: Children): TitleNode<Children> {
  return {
    children,
    id,
    kind: ASTNodeKinds.Title,
    title
  } as const;
}

export function createWrapperNode<Children extends ASTNodes[]>(...children: Children): WrapperNode<Children> {
  return {
    children,
    kind: ASTNodeKinds.Wrapper
  } as const;
}
