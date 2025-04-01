import { getArticlesByUser } from "@/features/article/api";
import { getAuthUser } from "@/lib/auth-utils";
import MyArticlesClient from "./_components/MyArticlesClient";

const MyArticlesPage = async () => {
  const { user } = await getAuthUser();

  const response = await getArticlesByUser(user.profile.profile_id);
  const articles = response.results;

  return (
    <MyArticlesClient articles={articles} profileId={user.profile.profile_id} />
  );
};

export default MyArticlesPage;
