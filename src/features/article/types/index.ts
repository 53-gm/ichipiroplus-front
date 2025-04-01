import type { UserProfile } from "@/features/user/types";
import { z } from "zod";

/**
 * 記事モデル
 */
export interface Article {
  id: string;
  slug: string; // プライマリキー
  title: string;
  author: UserProfile;
  content_html: string;
  content_json: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * 記事作成リクエスト
 */
export const articleFormSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルを入力してください")
    .max(100, "タイトルは100文字以内で入力してください"),
  content_json: z.string().min(1, "本文を入力してください"),
  content_html: z.string().min(1, "本文を入力してください"),
  is_public: z.boolean(),
});

export type ArticleFormData = z.infer<typeof articleFormSchema>;
