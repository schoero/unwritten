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

export function createBoldNode<Children extends ASTNodes[]>(children: Children): BoldNode<Children>;
export function createBoldNode<Children extends ASTNodes[]>(...children: Children): BoldNode<Children>;
export function createBoldNode<Children extends ASTNodes[]>(...children: Children): BoldNode<Children> {
  return {
    children,
    kind: ASTNodeKinds.Bold
  };
}

export function createItalicNode<Children extends ASTNodes[]>(children: Children): ItalicNode<Children>;
export function createItalicNode<Children extends ASTNodes[]>(...children: Children): ItalicNode<Children>;
export function createItalicNode<Children extends ASTNodes[]>(...children: Children): ItalicNode<Children> {
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

export function createParagraphNode<Children extends ASTNodes[]>(children: Children): ParagraphNode<Children>;
export function createParagraphNode<Children extends ASTNodes[]>(...children: Children): ParagraphNode<Children>;
export function createParagraphNode<Children extends ASTNodes[]>(...children: Children): ParagraphNode<Children> {
  return {
    children,
    kind: ASTNodeKinds.Paragraph
  };
}

export function createSmallNode<Children extends ASTNodes[]>(children: Children): SmallNode<Children>;
export function createSmallNode<Children extends ASTNodes[]>(...children: Children): SmallNode<Children>;
export function createSmallNode<Children extends ASTNodes[]>(...children: Children): SmallNode<Children> {
  return {
    children,
    kind: ASTNodeKinds.Small
  };
}

export function createStrikethroughNode<Children extends ASTNodes[]>(children: Children): StrikethroughNode<Children>;
export function createStrikethroughNode<Children extends ASTNodes[]>(...children: Children): StrikethroughNode<Children>;
export function createStrikethroughNode<Children extends ASTNodes[]>(...children: Children): StrikethroughNode<Children> {
  return {
    children,
    kind: ASTNodeKinds.Strikethrough
  };
}

export function createTitleNode<Children extends ASTNodes[]>(title: ASTNodes, children?: Children): TitleNode<Children>;
export function createTitleNode<Children extends ASTNodes[]>(title: ASTNodes, ...children: Children): TitleNode<Children>;
export function createTitleNode<Children extends ASTNodes[]>(title: ASTNodes, id: number, children?: Children): TitleNode<Children>;
export function createTitleNode<Children extends ASTNodes[]>(title: ASTNodes, id: number, ...children: Children): TitleNode<Children>;
export function createTitleNode<Children extends ASTNodes[]>(title: ASTNodes, ...idOrChildren: Children | [id: number, ...children: Children]): TitleNode<Children> {

  let id: number | undefined;
  let children: Children;

  if(typeof idOrChildren === "number" || typeof idOrChildren === "undefined"){
    id = idOrChildren;
    children = <ASTNodes>[] as Children;
  } else {
    if(typeof idOrChildren[0] === "number" || typeof idOrChildren[0] === "undefined"){
      const [first, ...rest] = idOrChildren;
      id = first;
      children = rest as Children;
    } else {
      children = idOrChildren as Children;
    }
  }

  return {
    children,
    id,
    kind: ASTNodeKinds.Title,
    title
  } as const;
}
