import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { DBlockNodeView } from "./DBlockNodeView";

export interface DBlockOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    dBlock: {
      /**
       * Toggle a dBlock
       */
      setDBlock: (position?: number) => ReturnType;
    };
  }
}

export const DBlock = Node.create<DBlockOptions>({
  name: "dBlock",

  priority: 1000,

  group: "dblock",

  content: "block",

  draggable: true,

  selectable: false,

  inline: false,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="d-block"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": "d-block",
        class: "d-block",
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setDBlock:
        position =>
        ({ state, chain }) => {
          const {
            selection: { from },
          } = state;

          const pos =
            position !== undefined || position !== null ? from : position;

          return chain()
            .insertContentAt(pos, {
              type: this.name,
              content: [
                {
                  type: "paragraph",
                },
              ],
            })
            .focus(pos + 2)
            .run();
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(DBlockNodeView);
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setDBlock(),
      Enter: ({ editor }) => {
        const {
          selection: { $head, from, to },
          doc,
        } = editor.state;

        const parent = $head.node($head.depth - 1);

        if (parent.type.name !== "dBlock") return false;

        let currentActiveNodeTo = -1;

        doc.descendants((node, pos) => {
          if (currentActiveNodeTo !== -1) return false;
          // eslint-disable-next-line consistent-return
          if (node.type.name === this.name) return;

          const [nodeFrom, nodeTo] = [pos, pos + node.nodeSize];

          if (nodeFrom <= from && to <= nodeTo) currentActiveNodeTo = nodeTo;

          return false;
        });

        // const content = doc.slice(from, currentActiveNodeTo)?.toJSON().content;

        // const initialFrom = from;
        // const initialTo = currentActiveNodeTo;
        // const initialSelection = editor.state.selection;

        // const timerId = setTimeout(() => {
        //   // タイムアウト時に現在の選択状態や状態がまだ同じかチェックする
        //   const { selection } = editor.state;
        //   // 例として、選択の開始位置が変わっていたらキャンセルする
        //   if (selection.from !== initialSelection.from) {
        //     return;
        //   }

        //   editor
        //     .chain()
        //     .insertContentAt(
        //       { from: initialFrom, to: initialTo },
        //       {
        //         type: this.name,
        //         content,
        //       }
        //     )
        //     .focus(initialFrom + 4)
        //     .run();
        // }, 30);

        return false;
      },
    };
  },
});
