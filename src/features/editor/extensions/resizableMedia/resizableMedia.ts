import { Node, mergeAttributes, nodeInputRule } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ResizableMediaNodeView } from "./ResizableMediaNodeView";

export type UploadFnType = (image: File) => Promise<string>;

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    resizableMedia: {
      /**
       * Set media
       */
      setMedia: (options: {
        "media-type": "img" | "video";
        src: string;
        alt?: string;
        title?: string;
        widthPercent?: number;
      }) => ReturnType;
    };
  }
}

export interface MediaOptions {
  HTMLAttributes: Record<string, unknown>;
  uploadFn: UploadFnType;
}

export const IMAGE_INPUT_REGEX =
  /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;

export const VIDEO_INPUT_REGEX =
  /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

export const ResizableMedia = Node.create<MediaOptions>({
  name: "resizableMedia",

  addOptions() {
    return {
      HTMLAttributes: {},
      uploadFn: async () => {
        return "";
      },
    };
  },

  inline: false,

  group: "block",

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      "media-type": {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      widthPercent: {
        default: 100,
        parseHTML: element => {
          const value = element.style.width;
          if (value?.endsWith("%")) {
            return Number.parseFloat(value);
          }
          return 100;
        },
        renderHTML: attributes => {
          if (!attributes.widthPercent) {
            return {};
          }
          return {
            style: `width: ${attributes.widthPercent}%`,
          };
        },
      },
      dataAlign: {
        default: "start",
        parseHTML: element => {
          const parentStyle = element.parentElement?.style.textAlign;
          if (parentStyle === "center") return "center";
          if (parentStyle === "right") return "end";
          return "start";
        },
        renderHTML: () => ({}),
      },
      dataFloat: {
        default: null,
      },
    };
  },

  selectable: true,

  parseHTML() {
    return [
      {
        tag: 'img[src]:not([src^="data:"])',
        getAttrs: el => ({
          src: (el as HTMLImageElement).getAttribute("src"),
          "media-type": "img",
        }),
      },
      {
        tag: "video",
        getAttrs: el => ({
          src: (el as HTMLVideoElement).getAttribute("src"),
          "media-type": "video",
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { "media-type": mediaType, dataAlign } = HTMLAttributes;
    const containerStyle = dataAlign
      ? `text-align: ${
          dataAlign === "start"
            ? "left"
            : dataAlign === "end"
              ? "right"
              : "center"
        }`
      : "";

    if (mediaType === "img") {
      return [
        "div",
        { style: containerStyle },
        [
          "img",
          mergeAttributes(this.options.HTMLAttributes, {
            ...HTMLAttributes,
            style: HTMLAttributes.style,
          }),
        ],
      ];
    }
    if (mediaType === "video") {
      return [
        "div",
        { style: containerStyle },
        [
          "video",
          { controls: "true", ...HTMLAttributes },
          ["source", HTMLAttributes],
        ],
      ];
    }

    // Default fallback
    return [
      "div",
      { style: containerStyle },
      ["img", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)],
    ];
  },

  addCommands() {
    return {
      setMedia:
        options =>
        ({ commands }) => {
          const { "media-type": mediaType } = options;

          if (mediaType === "img") {
            return commands.insertContent({
              type: this.name,
              attrs: options,
            });
          }
          if (mediaType === "video") {
            return commands.insertContent({
              type: this.name,
              attrs: {
                ...options,
                controls: "true",
              },
            });
          }

          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableMediaNodeView);
  },

  addStorage() {
    return {
      uploadFn: this.options.uploadFn,
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: IMAGE_INPUT_REGEX,
        type: this.type,
        getAttributes: match => {
          const [, , alt, src, title] = match;

          return {
            src,
            alt,
            title,
            "media-type": "img",
          };
        },
      }),
      nodeInputRule({
        find: VIDEO_INPUT_REGEX,
        type: this.type,
        getAttributes: match => {
          const [, , src] = match;

          return {
            src,
            "media-type": "video",
          };
        },
      }),
    ];
  },
});
