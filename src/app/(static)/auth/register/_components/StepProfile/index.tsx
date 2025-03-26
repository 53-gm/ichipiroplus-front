import MyProfileEditForm from "@/features/user/components/MyProfileEditForm";
import { Department, Faculty } from "@/features/user/types";
import { Card, CardBody, CardHeader, Heading } from "@yamada-ui/react";
import { User } from "next-auth";

interface StepProfileProps {
  onStepNext: () => void;
  onStepPrev: () => void;
  departments: Department[];
  faculties: Faculty[];
  user: User;
}

const StepProfile = ({
  onStepNext,
  departments,
  faculties,
  user,
}: StepProfileProps) => {
  return (
    <Card variant="outline" bg="white" p="md" w={{ base: "4xl", md: "sm" }}>
      <CardHeader>
        <Heading size="xl">プロフィール設定</Heading>
      </CardHeader>

      <CardBody>
        <MyProfileEditForm
          departments={departments}
          faculties={faculties}
          userProfile={user.profile}
          onSuccess={onStepNext}
          isFirst
        />
      </CardBody>
    </Card>
  );
};

export default StepProfile;
