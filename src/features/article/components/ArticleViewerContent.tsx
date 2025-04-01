"use client";

import { useEditor } from "@tiptap/react";
import { useEffect } from "react";
import type { Article } from "../types";
import getArticleEditorConfig from "./ArticleEditorConfig";
import ArticleEditorContent from "./ArticleEditorContent";

interface ArticleViewerContentProps {
  article: Article;
}

const ArticleViewerContent = ({ article }: ArticleViewerContentProps) => {
  // 読み取り専用エディタの設定
  const editor = useEditor(
    getArticleEditorConfig({
      isEditable: false,
    }),
  );

  // 記事内容を設定
  useEffect(() => {
    if (editor && article.content_json) {
      try {
        const content = JSON.parse(article.content_json);
        editor.commands.setContent(content);
      } catch (error) {
        console.error("記事内容の解析に失敗しました:", error);
        editor.commands.setContent("<p>記事の内容を読み込めませんでした</p>");
      }
    }
  }, [editor, article.content_json]);

  if (!editor) {
    return null; // ローディング中は何も表示しない
  }

  return <ArticleEditorContent editor={editor} showBubbleMenu={false} />;
};

export default ArticleViewerContent;
