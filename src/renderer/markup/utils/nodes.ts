import { isAnchor } from "unwritten:renderer/markup/registry/registry";
import { isTitleNode } from "unwritten:renderer/markup/typeguards/renderer.js";

import { ASTNodeKinds } from "../enums/nodes";

import type { ID, Name } from "unwritten:interpreter:type-definitions/jsdoc";
import type { SectionType } from "unwritten:renderer:markup/types-definitions/sections";
import type { AnchorTarget } from "unwritten:renderer/markup/registry/registry";

import type {
  AnchorNode,
  ASTNode,
  BoldNode,
  ConditionalNode,
  ConditionalOperator,
  InlineTitleNode,
  ItalicNode,
  LinkNode,
  ListNode,
  MultilineNode,
  PaddedNode,
  ParagraphNode,
  SectionNode,
  SmallNode,
  SpanNode,
  StrikethroughNode,
  TitleNode
} from "../types-definitions/nodes";


export function createAnchorNode(name: Name, id: ID, displayName = name): AnchorNode {
  return {
    children: [name],
    displayName,
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

export function createInlineTitleNode<Children extends ASTNode[]>(title: ASTNode, anchor: AnchorTarget, ...children: Children): InlineTitleNode<Children> {
  return {
    ...anchor,
    children,
    kind: ASTNodeKinds.InlineTitle,
    title
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

export function createPaddedNode<Children extends ASTNode[]>(...children: Children): PaddedNode<Children> {
  return {
    children,
    kind: ASTNodeKinds.Padded
  };
}

export function createParagraphNode<Children extends ASTNode[]>(...children: Children): ParagraphNode<Children> {
  return {
    children,
    kind: ASTNodeKinds.Paragraph
  };
}


export function createSectionNode<Children extends ASTNode[]>(type: SectionType | undefined, ...titleOrChildren: Children): SectionNode<Children> {

  const { children, title } = separateTitleAndChildren<Children>(titleOrChildren);

  return {
    children,
    kind: ASTNodeKinds.Section,
    title,
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

export function createTitleNode<Children extends ASTNode[]>(title: ASTNode, anchor: AnchorTarget, ...children: Children): TitleNode<Children> {
  return {
    ...anchor,
    children,
    kind: ASTNodeKinds.Title,
    title
  };
}

function separateAnchorAndChildren<Children extends ASTNode[]>(anchorOrChildren: Children | [anchor: AnchorTarget, ...children: Children]) {

  let anchor: AnchorTarget | {} = {};
  let children: Children;

  if(isAnchor(anchorOrChildren) || typeof anchorOrChildren === "undefined"){
    anchor = anchorOrChildren;
    children = <ASTNode>[] as Children;
  } else {
    if(isAnchor(anchorOrChildren[0])){
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


function separateTitleAndChildren<const Children extends ASTNode[]>(titleOrChildren: Children): { children: ExtractChildrenFromSectionNode<SectionNode<Children>>; title?: ExtractTitleNodeFromSectionNode<SectionNode<Children>>; } {

  let title: ExtractTitleNodeFromSectionNode<SectionNode<Children>> | undefined;
  let children: ExtractChildrenFromSectionNode<SectionNode<Children>>;

  const [first, ...rest] = titleOrChildren;

  if(isTitleNode(first)){
    title = first as unknown as ExtractTitleNodeFromSectionNode<SectionNode<Children>>;
    children = rest as ExtractChildrenFromSectionNode<SectionNode<Children>>;
  } else {
    children = titleOrChildren as ExtractChildrenFromSectionNode<SectionNode<Children>>;
  }

  return {
    children,
    title
  };

}


type ExtractTitleNodeFromSectionNode<Section extends SectionNode> =
  Section extends SectionNode<infer Children>
    ? Children extends [infer First, ...infer Rest]
      ? First extends TitleNode
        ? First
        : undefined
      : undefined
    : undefined;

type ExtractChildrenFromSectionNode<Section extends SectionNode> =
  Section extends SectionNode<infer Children>
    ? Children extends [infer First, ...infer Rest]
      ? First extends TitleNode
        ? Rest
        : Children
      : Children
    : never;
