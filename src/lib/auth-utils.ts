import { auth } from "@/lib/auth";
import { Session, User } from "next-auth";
import { redirect } from "next/navigation";

/**
 * 認証済みユーザー情報を取得する
 * 未認証の場合は指定されたパスにリダイレクトする
 * @param redirectTo リダイレクト先のパス (デフォルト: /auth/login)
 * @param requireCompleteProfile プロフィール完了が必要かどうか (デフォルト: true)
 * @returns 認証済みユーザー情報とセッション
 */
export const getAuthUser = async (
  redirectTo: string = "/auth/login",
  requireCompleteProfile: boolean = true
): Promise<{
  session: Session;
  user: User;
}> => {
  const session = await auth();
  if (!session?.user) {
    redirect(redirectTo);
  }
  if (requireCompleteProfile && !session.user.profile.is_profile_complete) {
    redirect(`/auth/register?callbackUrl=${encodeURIComponent(redirectTo)}`);
  }

  return {
    session,
    user: session.user,
  };
};
