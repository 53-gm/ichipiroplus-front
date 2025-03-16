import { getExtensions } from "@/lib/tiptap/extensions";
import { Editor, UseEditorOptions } from "@tiptap/react";

export interface ArticleEditorConfig {
  isEditable?: boolean;
  content?: string | null;
  onUpdate?: (editor: Editor) => void;
}

const getArticleEditorConfig = ({
  isEditable = true,
  content = null,
  onUpdate,
}: ArticleEditorConfig = {}): Partial<UseEditorOptions> => ({
  extensions: getExtensions(),
  content,
  immediatelyRender: false,
  editable: isEditable,
  editorProps: {
    attributes: {
      class: "focus:outline-none w-full",
      spellcheck: "false",
    },
  },
  onUpdate: onUpdate
    ? ({ editor }: { editor: Editor }) => onUpdate(editor)
    : undefined,
});

export default getArticleEditorConfig;
