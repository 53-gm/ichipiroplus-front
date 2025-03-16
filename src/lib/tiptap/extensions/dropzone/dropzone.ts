import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { DropZoneNodeView } from "./DropZoneNodeView";

export interface DropZoneOptions {
  HTMLAttributes: Record<string, unknown>;
  uploadFn: (file: File) => Promise<string>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    dropZone: {
      /**
       * Insert a drop zone
       */
      setDropZone: () => ReturnType;
    };
  }
}

export const DropZone = Node.create<DropZoneOptions>({
  name: "dropZone",

  priority: 1000,

  group: "block",

  draggable: true,

  selectable: true,

  inline: false,

  addOptions() {
    return {
      HTMLAttributes: {},
      uploadFn: async () => {
        return "";
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="drop-zone"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "drop-zone" }),
      0,
    ];
  },

  addCommands() {
    return {
      setDropZone:
        () =>
        ({ chain }) => {
          return chain()
            .insertContent({
              type: this.name,
            })
            .run();
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(DropZoneNodeView);
  },

  addStorage() {
    return {
      uploadFn: this.options.uploadFn,
    };
  },
});
