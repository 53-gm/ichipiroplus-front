"use server";

import { fetchApi } from "@/lib/api/client";
import { PaginatedResponse } from "@/types/api";
import { revalidateTag } from "next/cache";
import { Article, ArticleFormData } from "../types";

/**
 * 記事を取得
 */
export const getArticles = (page: number = 1) => {
  return fetchApi<PaginatedResponse<Article>>(
    `/api/v1/articles/list/?page=${page}`,
    {
      method: "GET",
      next: { tags: ["articles"], revalidate: 24 * 60 * 60 },
    }
  );
};

/**
 * スラッグで記事を取得
 */
export const getArticleBySlug = (profileId: string, slug: string) => {
  return fetchApi<Article>(`/api/v1/articles/by-user/${profileId}/${slug}/`, {
    method: "GET",
    next: { tags: [`article-${profileId}-${slug}`], revalidate: 24 * 60 * 60 },
  });
};

/**
 * ユーザーの記事を取得
 */
export const getArticlesByUser = (profileId: string, page: number = 1) => {
  return fetchApi<PaginatedResponse<Article>>(
    `/api/v1/articles/by-user/${profileId}/?page=${page}`,
    {
      method: "GET",
      next: { tags: [`articles-by-user-${profileId}`], revalidate: 24 * 60 * 60 },
    }
  );
};

/**
 * 記事を作成
 */
export const createArticle = async (data: ArticleFormData) => {
  const resposne = await fetchApi<Article>(`/api/v1/articles/list/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  revalidateTag(`article-${resposne.author.profile_id}-${resposne.slug}`);
  revalidateTag(`articles-by-user-${resposne.author.profile_id}`);
  revalidateTag("articles");

  return resposne;
};

/**
 * 記事を更新
 */
export const updateArticle = async (id: string, data: Partial<ArticleFormData>) => {
  const response = await fetchApi<Article>(`/api/v1/articles/list/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  revalidateTag(`article-${response.author.profile_id}-${response.slug}`);
  revalidateTag(`articles-by-user-${response.author.profile_id}`);
  revalidateTag("articles");

  return response;
};

/**
 * 記事の削除
 */
export const deleteArticle = async (article: Article) => {
  const resposne = await fetchApi<void>(`/api/v1/articles/list/${article.id}/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  revalidateTag(`article-${article.author.profile_id}-${article.slug}`);
  revalidateTag(`articles-by-user-${article.author.profile_id}`);
  revalidateTag("articles");

  return resposne;
};

/**
 * 画像をアップロード
 */
export const uploadImage = (data: FormData) => {
  return fetchApi<{ url: string }>(`/api/v1/articles/upload/`, {
    method: "POST",
    body: data,
  });
};
