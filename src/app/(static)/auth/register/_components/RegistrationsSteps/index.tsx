// RegistrationSteps.tsx
"use client";

import type { Department, Faculty } from "@/features/user/types";
import type { User } from "next-auth";
import RegistrationStepper from "../RegistrationStepper";
import StepIntro from "../StepIntro";
import StepProfile from "../StepProfile";

interface RegistrationStepsProps {
  departments: Department[];
  faculties: Faculty[];
  user: User;
}

const RegistrationSteps = ({
  departments,
  faculties,
  user,
}: RegistrationStepsProps) => {
  return (
    <RegistrationStepper
      renderItem={({ onStepNext, onStepPrev }) => [
        <StepIntro key={1} onStepNext={onStepNext} onStepPrev={onStepPrev} />,
        <StepProfile
          key={2}
          departments={departments}
          faculties={faculties}
          user={user}
          onStepNext={onStepNext}
          onStepPrev={onStepPrev}
        />,
      ]}
    />
  );
};

export default RegistrationSteps;
