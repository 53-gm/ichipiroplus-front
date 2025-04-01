import ArticleCreator from "@/features/article/components/ArticleCreater";
import { getAuthUser } from "@/lib/auth-utils";

const CreateArticlePage = async () => {
  const { user } = await getAuthUser();

  return <ArticleCreator profileId={user.profile.profile_id} />;
};

export default CreateArticlePage;
