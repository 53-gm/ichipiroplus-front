import { getArticleBySlug } from "@/features/article/api";
import ArticleEditor from "@/features/article/components/ArticleEditor";
import { getAuthUser } from "@/lib/auth-utils";
import { notFound } from "next/navigation";

interface ArticleEditPageProps {
  params: {
    profile_id: string;
    slug: string;
  };
}

const ArticleEditPage = async ({ params }: ArticleEditPageProps) => {
  const { profile_id, slug } = params;

  const { user } = await getAuthUser();

  const article = await getArticleBySlug(profile_id, slug);

  if (user.profile.profile_id !== profile_id) {
    notFound();
  }

  return <ArticleEditor article={article} />;
};

export default ArticleEditPage;
