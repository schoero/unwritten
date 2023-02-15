import { ASTNodeKinds } from "../enums/nodes.js";

import type { ASTNodes, LinkNode, ParagraphNode, SmallNode, TitleNode } from "../types-definitions/nodes.js";


export function createContainerNode<T extends ASTNodes[]>(...children: T) {
  return {
    children,
    kind: ASTNodeKinds.Container
  } as const;
}

export function createLinkNode(children: string, link: string): LinkNode {
  return {
    children,
    kind: ASTNodeKinds.Link,
    link
  };
}

export function createListNode<T extends ASTNodes>(children: T[]) {
  return {
    children,
    kind: ASTNodeKinds.List
  } as const;
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

export function createTitleNode(title: string, id?: string, ...children: ASTNodes[]): TitleNode {
  return {
    children,
    id,
    kind: ASTNodeKinds.Title,
    title
  };
}
