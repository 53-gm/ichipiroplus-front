"use client";

import { Stepper, Steps, useSteps } from "@yamada-ui/react";
import { ReactElement } from "react";

interface RegistrationStepperProps {
  renderItem: (props: {
    onStepNext: () => void;
    onStepPrev: () => void;
  }) => ReactElement[];
}

const RegistrationStepper = ({ renderItem }: RegistrationStepperProps) => {
  const steps: Steps = [{ title: "はじめに" }, { title: "プロフィール設定" }];

  const { activeStep, onStepNext, onStepPrev } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <>
      <Stepper
        colorScheme="green"
        index={activeStep}
        steps={steps}
        size={{ base: "lg", md: "sm" }}
        maxW={"md"}
        orientation="horizontal"
      />
      {renderItem({ onStepNext, onStepPrev })[activeStep]}
    </>
  );
};

export default RegistrationStepper;
