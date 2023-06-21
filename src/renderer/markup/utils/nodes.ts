import { isAnchor } from "unwritten:renderer/markup/utils/linker.js";

import { ASTNodeKinds } from "../enums/nodes.js";

import type {
  AnchorNode,
  ASTNodes,
  BoldNode,
  ItalicNode,
  LinkNode,
  ListNode,
  ParagraphNode,
  SectionNode,
  SmallNode,
  SpanNode,
  StrikethroughNode,
  TitleNode
} from "../types-definitions/nodes.js";

import type { ID, Name } from "unwritten:interpreter/type-definitions/shared.js";
import type { SectionType } from "unwritten:renderer/markup/enums/sections.js";
import type { Anchor } from "unwritten:renderer/markup/utils/linker.js";


export function createAnchorNode(name: Name, id: ID): AnchorNode {
  return {
    children: [name],
    id,
    kind: ASTNodeKinds.Anchor,
    name
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

export function createLinkNode<Children extends ASTNodes[]>(children: Children, link: string): LinkNode<Children>;
export function createLinkNode<Children extends ASTNodes[]>(...childrenAndLink: [...children: Children, link: string]): LinkNode<Children>;
export function createLinkNode<Children extends ASTNodes[]>(...childrenLink: [...children: Children, link: string]): LinkNode<Children> {

  const link = childrenLink[childrenLink.length - 1] as string;
  const children = childrenLink.slice(0, -1) as Children;

  return {
    children,
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

// export function createSectionNode<Children extends ASTNodes[]>(children?: Children): SectionNode<Children>;
// export function createSectionNode<Children extends ASTNodes[]>(...children: Children): SectionNode<Children>;
export function createSectionNode<Children extends ASTNodes[]>(type: SectionType | undefined, children?: Children): SectionNode<Children>;
export function createSectionNode<Children extends ASTNodes[]>(type: SectionType | undefined, ...children: Children): SectionNode<Children>;
export function createSectionNode<Children extends ASTNodes[]>(type: SectionType | undefined, ...children: Children): SectionNode<Children> {
// export function createSectionNode<Children extends ASTNodes[]>(...typeOrChildren: Children | [type: SectionType, ...children: Children]): SectionNode<Children> {

  // const separateTypeAndChildren = (typeOrChildren: Children | [type: SectionType, ...children: Children]): [SectionType | undefined, Children] => {
  //   if(typeof typeOrChildren[0] === "string" && Object.values(SECTION_TYPE).includes(typeOrChildren[0] as SectionType)){
  //     const [type, ...children] = typeOrChildren as [SectionType, ...Children];
  //     return [type, children];
  //   } else {
  //     const [children] = typeOrChildren;
  //     return [undefined, children] as [undefined, Children];
  //   }
  // };

  // const [type, children] = separateTypeAndChildren(typeOrChildren);

  return {
    children,
    kind: ASTNodeKinds.Section,
    type
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

export function createSpanNode<Children extends ASTNodes[]>(children?: Children): SpanNode<Children>;
export function createSpanNode<Children extends ASTNodes[]>(...children: Children): SpanNode<Children>;
export function createSpanNode<Children extends ASTNodes[]>(anchor: Anchor, children?: Children): SpanNode<Children>;
export function createSpanNode<Children extends ASTNodes[]>(anchor: Anchor, ...children: Children): SpanNode<Children>;
export function createSpanNode<Children extends ASTNodes[]>(...anchorOrChildren: Children | [anchor: Anchor, ...children: Children]): SpanNode<Children> {

  const { anchor, children } = separateAnchorAndChildren<Children>(anchorOrChildren);

  return {
    ...anchor,
    children,
    kind: ASTNodeKinds.Span
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
export function createTitleNode<Children extends ASTNodes[]>(title: ASTNodes, anchor?: Anchor, children?: Children): TitleNode<Children>;
export function createTitleNode<Children extends ASTNodes[]>(title: ASTNodes, anchor?: Anchor, ...children: Children): TitleNode<Children>;
export function createTitleNode<Children extends ASTNodes[]>(title: ASTNodes, ...anchorOrChildren: Children | [anchor: Anchor, ...children: Children]): TitleNode<Children> {

  const { anchor, children } = separateAnchorAndChildren<Children>(anchorOrChildren);

  return {
    ...anchor,
    children,
    kind: ASTNodeKinds.Title,
    title
  } as const;

}


function separateAnchorAndChildren<Children extends ASTNodes[]>(anchorOrChildren: Children | [anchor: Anchor, ...children: Children]) {

  let anchor: Anchor = {};
  let children: Children;

  if(isAnchor(anchorOrChildren) || typeof anchorOrChildren === "undefined"){
    anchor = anchorOrChildren;
    children = <ASTNodes>[] as Children;
  } else {
    if(isAnchor(anchorOrChildren[0]) || typeof anchorOrChildren[0] === "undefined"){
      const [first, ...rest] = anchorOrChildren;
      anchor = first;
      children = rest as Children;
    } else {
      children = anchorOrChildren as Children;
    }
  }

  return {
    anchor,
    children
  };

}
