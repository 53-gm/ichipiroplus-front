import { getArticleBySlug, getArticlesByUser } from "@/features/article/api";
import ArticlesList from "@/features/article/components/ArticleList";
import ArticleViewer from "@/features/article/components/ArticleViewer";
import { Article } from "@/features/article/types";
import { auth } from "@/lib/auth";
import { Separator } from "@yamada-ui/react";
import { notFound } from "next/navigation";

interface ArticlePageProps {
  params: {
    profile_id: string;
    slug: string;
  };
}

const ArticlePage = async ({ params }: ArticlePageProps) => {
  const { profile_id, slug } = params;

  try {
    const article = await getArticleBySlug(profile_id, slug);

    const session = await auth();
    const currentUser = session?.user;

    // アクセス権のチェック
    if (
      !article.is_public &&
      (!currentUser || currentUser.profile.profile_id !== profile_id)
    ) {
      notFound();
    }

    let relatedArticles: Article[] = [];
    try {
      const { results: otherArticles } = await getArticlesByUser(profile_id);
      relatedArticles = otherArticles
        .filter((a) => a.slug !== slug)
        .slice(0, 4);
    } catch (error) {
      console.error("関連記事の取得に失敗しました:", error);
    }

    const isAuthor =
      !!currentUser && currentUser.profile.profile_id === profile_id;

    return (
      <>
        <ArticleViewer article={article} isAuthor={isAuthor} />

        {relatedArticles.length > 0 && (
          <>
            <Separator my={8} />
            <ArticlesList
              data={{
                results: relatedArticles,
                count: relatedArticles.length,
                next: null,
                previous: null,
              }}
              title="著者の他の記事"
            />
          </>
        )}
      </>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
};

export default ArticlePage;
