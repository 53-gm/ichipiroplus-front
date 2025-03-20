import { getArticlesByUser } from "@/features/article/api";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import MyArticlesClient from "./_components/MyArticlesClient";

const MyArticlesPage = async () => {
  const session = await auth();

  if (!session?.user?.profile?.profile_id) {
    return notFound();
  }

  const response = await getArticlesByUser(session.user.profile.profile_id);
  const articles = response.results;

  return (
    <MyArticlesClient
      articles={articles}
      profileId={session.user.profile.profile_id}
    />
  );
};

export default MyArticlesPage;
