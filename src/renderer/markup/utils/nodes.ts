import { ASTNodeKinds } from "../enums/nodes.js";

import type { ASTNodes, LinkNode, ParagraphNode, SmallNode, TitleNode } from "../types-definitions/nodes.js";


export function createContainerNode<T extends ASTNodes[]>(...content: T) {
  return {
    content,
    kind: ASTNodeKinds.Container
  } as const;
}

export function createLinkNode(content: string, link: string): LinkNode {
  return {
    content,
    kind: ASTNodeKinds.Link,
    link
  };
}

export function createListNode<T extends ASTNodes>(content: T[]) {
  return {
    content,
    kind: ASTNodeKinds.List
  } as const;
}

export function createParagraphNode(content: string): ParagraphNode {
  return {
    content,
    kind: ASTNodeKinds.Paragraph
  };
}

export function createSmallNode(content: string): SmallNode {
  return {
    content,
    kind: ASTNodeKinds.Small
  };
}

export function createTitleNode(content: string, id?: string): TitleNode {
  return {
    content,
    id,
    kind: ASTNodeKinds.Title
  };
}
