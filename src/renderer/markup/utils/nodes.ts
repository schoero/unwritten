import { ASTNodeKinds } from "../enums/nodes.js";

import type {
  AnchorNode,
  ASTNodes,
  BoldNode,
  ContainerNode,
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

export function createBoldNode(...children: ASTNodes[]): BoldNode {
  return {
    children,
    kind: ASTNodeKinds.Bold
  };
}

export function createContainerNode<Children extends ASTNodes[]>(children: Children): ContainerNode<Children>;
export function createContainerNode<Children extends ASTNodes[]>(...children: Children): ContainerNode<Children>;
export function createContainerNode<Children extends ASTNodes[]>(...children: Children): ContainerNode<Children> {
  return {
    children,
    kind: ASTNodeKinds.Container
  };
}

export function createItalicNode(...children: ASTNodes[]): ItalicNode {
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

export function createListNode<Children extends ASTNodes[]>(children: Children): ListNode<Children>;
export function createListNode<Children extends ASTNodes[]>(...children: Children): ListNode<Children>;
export function createListNode<Children extends ASTNodes[]>(...children: Children): ListNode<Children> {
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
