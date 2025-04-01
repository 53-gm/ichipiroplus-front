import { getArticlesByUser } from "@/features/article/api";
import ArticlesList from "@/features/article/components/ArticleList";
import { getUserProfile } from "@/features/user/api";
import ProfileHeader from "@/features/user/components/ProfileHeader";
import { Box } from "@yamada-ui/react";

interface ProfilePageProps {
  params: {
    profile_id: string;
  };
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const { profile_id } = params;
  const profileData = await getUserProfile(profile_id);
  const articlesData = await getArticlesByUser(profile_id);
  const articlesCount = Array.isArray(articlesData) ? articlesData.length : 0;

  return (
    <Box w="full" rounded="md">
      {/* プロフィールヘッダー */}
      <ProfileHeader profile={profileData} articlesCount={articlesCount} />

      {/* 記事一覧 */}
      <ArticlesList
        data={articlesData}
        title={`${profileData.display_name || "ユーザー"}の記事`}
        emptyMessage="このユーザーはまだ記事を投稿していません"
      />
    </Box>
  );
};

export default ProfilePage;
