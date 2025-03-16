/* eslint-disable */

import { Editor, Range } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";
import * as fuzzysort from "fuzzysort";
import tippy from "tippy.js";

import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ImageIcon,
  ListCollapseIcon,
  ListOrderedIcon,
  QuoteIcon,
} from "@yamada-ui/lucide";
import { ReactElement } from "react";
import { stopPrevent } from "../../utils";
import { CommandList } from "./CommandList";

export interface SlashMenuItem {
  title: string;
  command: (params: { editor: Editor; range: Range }) => void;
  icon: ReactElement;
  shortcut: string;
  type: string;
  desc: string;
}

const SlashMenuItems: Partial<SlashMenuItem>[] = [
  // {
  //   type: "divider",
  //   title: "Basic Blocks",
  // },
  {
    title: "Heading1",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
    icon: <Heading1Icon />,
    shortcut: "#",
  },
  {
    title: "Heading2",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 2 })
        .run();
    },
    icon: <Heading2Icon />,
    shortcut: "##",
  },
  {
    title: "Heading3",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 3 })
        .run();
    },
    icon: <Heading3Icon />,
    shortcut: "###",
  },
  {
    title: "Ordered List",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
    icon: <ListOrderedIcon />,
    shortcut: "1. L",
  },
  {
    title: "Bullet List",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
    icon: <ListCollapseIcon />,
    shortcut: "- L",
  },

  {
    title: "Blockquote",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setBlockquote().run();
    },
    icon: <QuoteIcon />,
    shortcut: ">",
  },
  {
    title: "Image",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setDropZone().run();
    },
    icon: <ImageIcon />,
    shortcut: "",
  },
  // {
  //   title: "Code Block",
  //   command: ({ editor, range }) => {
  //     editor
  //       .chain()
  //       .focus()
  //       .deleteRange(range)
  //       .setCodeBlock({ language: "auto" })
  //       .run();
  //   },
  //   iconClass: "i-ri-code-box-line",
  //   shortcut: "```",
  // },
  // {
  //   title: "Underline",
  //   command: ({ editor, range }) => {
  //     editor.chain().focus().deleteRange(range).setMark("underline").run();
  //   },
  //   iconClass: "i-ri-underline",
  // },
  // {
  //   title: "Strike",
  //   command: ({ editor, range }) => {
  //     editor.chain().focus().deleteRange(range).setMark("strike").run();
  //   },
  //   iconClass: "i-ri-strikethrough",
  //   shortcut: "~~s~~",
  // },
  // {
  //   title: "Code",
  //   command: ({ editor, range }) => {
  //     editor.chain().focus().deleteRange(range).setMark("code").run();
  //   },
  //   iconClass: "i-ri-code-s-slash-line",
  //   shortcut: "`i`",
  // },
];

export const suggestions = {
  items: ({ query: q }: { query: string }) => {
    const query = q.toLowerCase().trim();

    if (!query) return SlashMenuItems;

    const fuzzyResults = fuzzysort
      .go(query, SlashMenuItems, { key: "title" })
      .map((item) => ({
        ...item,
      }));

    return fuzzyResults.map(({ obj }) => ({
      ...obj,
    }));
  },

  render: () => {
    let component: ReactRenderer;
    let popup: { destroy: () => void }[];
    let localProps: Record<string, any> | undefined;

    return {
      onStart: (props: Record<string, any> | undefined) => {
        localProps = { ...props, event: "" };

        component = new ReactRenderer(CommandList, {
          props: localProps,
          editor: localProps?.editor,
        });

        popup = tippy("body", {
          getReferenceClientRect: localProps.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
          animation: "shift-toward-subtle",
          duration: 250,
        });
      },

      onUpdate(props: Record<string, any> | undefined) {
        localProps = { ...props, event: "" };

        component.updateProps(localProps);

        (popup[0] as any).setProps({
          getReferenceClientRect: localProps.clientRect,
        });
      },

      onKeyDown(props: { event: KeyboardEvent }) {
        component.updateProps({ ...localProps, event: props.event });

        (component.ref as any).onKeyDown({ event: props.event });

        if (props.event.key === "Escape") {
          (popup[0] as any).hide();

          return true;
        }

        if (props.event.key === "Enter") {
          stopPrevent(props.event);

          return true;
        }

        return false;
      },

      onExit() {
        if (popup && popup[0]) popup[0]?.destroy();
        if (component) component.destroy();
      },
    };
  },
};
