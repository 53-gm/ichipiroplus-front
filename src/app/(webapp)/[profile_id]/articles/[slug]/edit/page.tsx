import { getArticleBySlug } from "@/features/article/api";
import ArticleEditor from "@/features/article/components/ArticleEditor";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

interface ArticleEditPageProps {
  params: {
    profile_id: string;
    slug: string;
  };
}

const ArticleEditPage = async ({ params }: ArticleEditPageProps) => {
  const { profile_id, slug } = params;

  const session = await auth();
  if (!session?.user) {
    redirect(
      "/auth/login?callbackUrl=" +
        encodeURIComponent(`/${profile_id}/articles/${slug}/edit`)
    );
  }

  try {
    const article = await getArticleBySlug(profile_id, slug);

    // アクセス権のチェック
    const currentUser = session.user;
    if (currentUser.profile.profile_id !== profile_id) {
      // 権限がない場合は404
      notFound();
    }

    return <ArticleEditor article={article} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
};

export default ArticleEditPage;
