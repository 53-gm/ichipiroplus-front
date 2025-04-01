"use client";
import { ApiError } from "@/lib/api/client";
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
  useNotice,
  VStack,
} from "@yamada-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createArticle } from "../api";
import getArticleEditorConfig from "./ArticleEditorConfig";
import ArticleEditorContent from "./ArticleEditorContent";

interface ArticleCreatorProps {
  profileId: string;
}

const ArticleCreator = ({ profileId }: ArticleCreatorProps) => {
  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const notice = useNotice();
  const router = useRouter();

  // エディタの設定
  const editor = useEditor(
    getArticleEditorConfig({
      content: "",
    }),
  );

  // 新しい記事を保存
  const saveArticle = async () => {
    if (!editor || !title.trim()) {
      notice({
        title: "エラー",
        description: "タイトルを入力してください",
        status: "error",
      });
      return;
    }

    setIsSaving(true);

    try {
      const editorContentJSON = JSON.stringify(editor.getJSON());
      const editorContentHTML = editor.getHTML();

      const result = await createArticle({
        title: title.trim(),
        content_json: editorContentJSON,
        content_html: editorContentHTML,
        is_public: isPublic,
      });

      notice({
        title: "成功",
        description: "記事を作成しました",
        status: "success",
      });

      // 作成した記事の表示ページにリダイレクト
      router.push(`/${profileId}/articles/${result.slug}`);
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
          description: "不明なエラー",
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
      {/* ヘッダー部分 */}
      <VStack
        as="header"
        pt={8}
        pb={6}
        borderBottomWidth="1px"
        borderColor="gray.200"
        w="full"
        align="start"
      >
        <Heading size="lg">新しい記事を作成</Heading>

        {/* タイトル入力 */}
        <FormControl label="タイトル" required>
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="タイトルを入力してください"
            size="lg"
            fontSize="2xl"
            fontWeight="bold"
          />
        </FormControl>

        {/* 公開設定とアクション */}
        <HStack w="full" justify="space-between">
          <Switch isChecked={isPublic} onChange={() => setIsPublic(!isPublic)}>
            公開する
          </Switch>

          <Button
            leftIcon={<SaveIcon />}
            colorScheme="blue"
            isLoading={isSaving}
            loadingText="作成中"
            onClick={saveArticle}
          >
            作成
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

export default ArticleCreator;
