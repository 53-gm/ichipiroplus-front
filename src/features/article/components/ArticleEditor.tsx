// src/app/[profile_id]/articles/[slug]/edit/ArticleEditor.tsx
"use client";

import { ApiError } from "@/lib/api/client";
import { format } from "@formkit/tempo";
import { useEditor } from "@tiptap/react";
import { SaveIcon } from "@yamada-ui/lucide";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Switch,
  Text,
  useNotice,
  VStack,
} from "@yamada-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { updateArticle } from "../api";
import { Article } from "../types";
import getArticleEditorConfig from "./ArticleEditorConfig";
import ArticleEditorContent from "./ArticleEditorContent";

interface ArticleEditorProps {
  article: Article;
}

const ArticleEditor = ({ article }: ArticleEditorProps) => {
  const [title, setTitle] = useState(article.title);
  const [isPublic, setIsPublic] = useState(article.is_public);
  const [isSaving, setIsSaving] = useState(false);
  const notice = useNotice();
  const router = useRouter();

  // 記事の表示ページへのパス
  const viewPath = `/${article.author.profile_id}/articles/${article.slug}`;

  // 日付フォーマット
  const formattedDate = format(article.created_at, "short", "ja");
  const formattedUpdateDate =
    article.updated_at !== article.created_at
      ? format(article.updated_at, "short", "ja")
      : null;

  // エディタの設定
  const editor = useEditor(getArticleEditorConfig());

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

  // 記事を保存
  const saveArticle = async () => {
    if (!editor) return;

    setIsSaving(true);

    try {
      const editorContentJSON = JSON.stringify(editor.getJSON());
      const editorContentHTML = editor.getHTML();

      await updateArticle(article.id, {
        title,
        content_json: editorContentJSON,
        content_html: editorContentHTML,
        is_public: isPublic,
      });

      notice({
        title: "成功",
        description: "記事を更新しました",
        status: "success",
      });

      // 記事の表示ページにリダイレクト
      router.push(viewPath);
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError) {
        notice({
          title: "エラー",
          description: error.message,
          status: "error",
        });
      } else {
        notice({
          title: "エラー",
          description: "不明なエラーが発生しました",
          status: "error",
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (!editor) {
    return null; // ローディング中は何も表示しない
  }

  return (
    <VStack w="full" align="start">
      <Alert status="warning">
        <AlertIcon />
        <AlertTitle>このページではPCでの操作が想定されています</AlertTitle>
      </Alert>
      {/* 編集ヘッダー部分 */}
      <VStack
        as="header"
        pt={8}
        pb={6}
        borderBottomWidth="1px"
        borderColor="gray.200"
        w="full"
        align="start"
      >
        <Heading size="md">記事の編集</Heading>

        {/* タイトル入力 */}
        <FormControl required label="タイトル">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトル"
            size="lg"
            fontSize="2xl"
            fontWeight="bold"
          />
        </FormControl>

        {/* 公開設定とアクション */}
        <HStack w="full" justify="space-between">
          <HStack>
            <Switch
              isChecked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
            >
              公開する
            </Switch>
            <Text color="gray.500" fontSize="sm">
              {formattedDate}に作成
              {formattedUpdateDate && `、${formattedUpdateDate}に更新`}
            </Text>
          </HStack>

          <Button
            leftIcon={<SaveIcon />}
            colorScheme="blue"
            isLoading={isSaving}
            loadingText="保存中"
            onClick={saveArticle}
          >
            保存
          </Button>
        </HStack>
      </VStack>

      {/* エディタ本体 */}
      <ArticleEditorContent
        editor={editor}
        showTableOfContents={true}
        showBubbleMenu={true}
        isEditable={true}
      />
    </VStack>
  );
};

export default ArticleEditor;
