import { getAllDepartments, getAllFaculties } from "@/features/user/api";
import AccountSettings from "@/features/user/components/AccountSettings";
import DisplaySettings from "@/features/user/components/DisplaySettings";
import MyProfileEditForm from "@/features/user/components/MyProfileEditForm";
import { getAuthUser } from "@/lib/auth-utils";

interface SettingsPageProps {
  searchParams: { tab?: string };
}

const SettingsPage = async ({ searchParams }: SettingsPageProps) => {
  const { user } = await getAuthUser();

  const departments = await getAllDepartments();
  const faculties = await getAllFaculties();

  const tab = searchParams.tab || "profile";

  return (
    <>
      {tab === "profile" && (
        <MyProfileEditForm
          departments={departments}
          faculties={faculties}
          userProfile={user.profile}
        />
      )}
      {tab === "account" && <AccountSettings />}

      {tab === "display" && <DisplaySettings />}
    </>
  );
};

export default SettingsPage;
