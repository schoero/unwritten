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
  TitleNode
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

export function createLinkNode(children: ASTNodes, link: string): LinkNode;
export function createLinkNode(children: ASTNodes, id: number): LinkNode;
export function createLinkNode(children: ASTNodes, linkOrId: number | string): LinkNode {
  const id = typeof linkOrId === "number" ? linkOrId : undefined;
  const link = typeof linkOrId === "string" ? linkOrId : undefined;
  return {
    children,
    id,
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

export function createParagraphNode(...children: ASTNodes[]): ParagraphNode {
  return {
    children,
    kind: ASTNodeKinds.Paragraph
  };
}

export function createSmallNode(...children: ASTNodes[]): SmallNode {
  return {
    children,
    kind: ASTNodeKinds.Small
  };
}

export function createStrikethroughNode(...children: ASTNodes[]): StrikethroughNode {
  return {
    children,
    kind: ASTNodeKinds.Strikethrough
  };
}

export function createTitleNode<Children extends ASTNodes[]>(title: ASTNodes, id?: number | undefined, children: Children = [] as unknown as Children): TitleNode<Children> {
  return {
    children,
    id,
    kind: ASTNodeKinds.Title,
    title
  } as const;
}
