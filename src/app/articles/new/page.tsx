import ArticleCreator from "@/features/article/components/ArticleCreater";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const CreateArticlePage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/articles/new");
  }

  const user = session.user;

  if (!user.profile.is_profile_complete) {
    redirect("/auth/register");
  }

  return <ArticleCreator profileId={user.profile.profile_id} />;
};

export default CreateArticlePage;
