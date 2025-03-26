import { getAllDepartments, getAllFaculties } from "@/features/user/api";
import { auth } from "@/lib/auth";
import { VStack } from "@yamada-ui/react";
import { notFound } from "next/navigation";
import RegistrationSteps from "./_components/RegistrationsSteps";

const RegisterPage = async () => {
  const session = await auth();

  if (!session || !session.user) {
    notFound();
  }

  const user = session.user;
  const departments = await getAllDepartments();
  const faculties = await getAllFaculties();

  return (
    <VStack alignItems="center">
      <RegistrationSteps
        departments={departments}
        faculties={faculties}
        user={user}
      />
    </VStack>
  );
};

export default RegisterPage;
