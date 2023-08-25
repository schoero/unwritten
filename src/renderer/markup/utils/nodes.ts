import { isAnchor } from "unwritten:renderer/markup/registry/registry.js";

import { ASTNodeKinds } from "../enums/nodes.js";

import type {
  AnchorNode,
  ASTNode,
  BoldNode,
  ConditionalNode,
  ConditionalOperator,
  ItalicNode,
  LinkNode,
  ListNode,
  MultilineNode,
  ParagraphNode,
  SectionNode,
  SmallNode,
  SpanNode,
  StrikethroughNode,
  TitleNode
} from "../types-definitions/nodes.js";

import type { ID, Name } from "unwritten:interpreter/type-definitions/shared.js";
import type { AnchorTarget } from "unwritten:renderer/markup/registry/registry.js";
import type { SectionType } from "unwritten:renderer:markup/types-definitions/sections.js";


export function createAnchorNode(name: Name, id: ID): AnchorNode {
  return {
    children: [name],
    id,
    kind: ASTNodeKinds.Anchor,
    name
  };
}

export function createBoldNode<Children extends ASTNode[]>(...children: Children): BoldNode<Children> {
  return {
    children,
    kind: ASTNodeKinds.Bold
  };
}

export function createConditionalNode<TrueChildren extends ASTNode, FalseChildren extends ASTNode>(func: Function, args: unknown[], operator: ConditionalOperator, value: unknown, trueChildren: TrueChildren, falseChildren: FalseChildren): ConditionalNode<TrueChildren, FalseChildren> {
  return {
    args,
    falseChildren,
    function: func,
    kind: ASTNodeKinds.Conditional,
    operator,
    trueChildren,
    value
  };
}

export function createItalicNode<Children extends ASTNode[]>(...children: Children): ItalicNode<Children> {
  return {
    children,
    kind: ASTNodeKinds.Italic
  };
}

export function createLinkNode<Children extends ASTNode[]>(...childrenLink: [...children: Children, link: string]): LinkNode<Children> {

  const link = childrenLink[childrenLink.length - 1] as string;
  const children = childrenLink.slice(0, -1) as Children;

  return {
    children,
    kind: ASTNodeKinds.Link,
    link
  };

}

export function createListNode<Children extends ASTNode[]>(...children: Children): ListNode<Children> {
  return {
    children,
    kind: ASTNodeKinds.List
  };
}

export function createMultilineNode<Children extends ASTNode[]>(...children: Children): MultilineNode<Children> {
  return {
    children,
    kind: ASTNodeKinds.Multiline
  };
}

export function createParagraphNode<Children extends ASTNode[]>(...children: Children): ParagraphNode<Children> {
  return {
    children,
    kind: ASTNodeKinds.Paragraph
  };
}

// export function createSectionNode<Children extends ASTNodes[]>(children?: Children): SectionNode<Children>;
// export function createSectionNode<Children extends ASTNodes[]>(...children: Children): SectionNode<Children>;
export function createSectionNode<Children extends ASTNode[]>(type: SectionType | undefined, ...children: Children): SectionNode<Children> {
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

export function createSmallNode<Children extends ASTNode[]>(...children: Children): SmallNode<Children> {
  return {
    children,
    kind: ASTNodeKinds.Small
  };
}

export function createSpanNode<Children extends ASTNode[]>(...children: Children): SpanNode<Children>;
export function createSpanNode<Children extends ASTNode[]>(anchor: AnchorTarget, ...children: Children): SpanNode<Children>;
export function createSpanNode<Children extends ASTNode[]>(...anchorOrChildren: Children | [anchor: AnchorTarget, ...children: Children]): SpanNode<Children> {

  const { anchor, children } = separateAnchorAndChildren<Children>(anchorOrChildren);

  return {
    ...anchor,
    children,
    kind: ASTNodeKinds.Span
  };

}

export function createStrikethroughNode<Children extends ASTNode[]>(...children: Children): StrikethroughNode<Children>;
export function createStrikethroughNode<Children extends ASTNode[]>(...children: Children): StrikethroughNode<Children> {
  return {
    children,
    kind: ASTNodeKinds.Strikethrough
  };
}

export function createTitleNode<Children extends ASTNode[]>(title: ASTNode, ...children: Children): TitleNode<Children>;
export function createTitleNode<Children extends ASTNode[]>(title: ASTNode, anchor?: AnchorTarget, ...children: Children): TitleNode<Children>;
export function createTitleNode<Children extends ASTNode[]>(title: ASTNode, ...anchorOrChildren: Children | [anchor: AnchorTarget, ...children: Children]): TitleNode<Children> {

  const { anchor, children } = separateAnchorAndChildren<Children>(anchorOrChildren);

  return {
    ...anchor,
    children,
    kind: ASTNodeKinds.Title,
    title
  } as const;

}


function separateAnchorAndChildren<Children extends ASTNode[]>(anchorOrChildren: Children | [anchor: AnchorTarget, ...children: Children]) {

  let anchor: AnchorTarget | {} = {};
  let children: Children;

  if(isAnchor(anchorOrChildren) || typeof anchorOrChildren === "undefined"){
    anchor = anchorOrChildren;
    children = <ASTNode>[] as Children;
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
