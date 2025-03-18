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
  // 今回の3ステップ
  const steps: Steps = [
    { title: "はじめに" },
    { title: "プロフィール設定" },
    { title: "登録完了" },
  ];

  // ステップ管理用フック
  const { activeStep, onStepNext, onStepPrev } = useSteps({
    index: 0, // 初期ステップのインデックス
    count: steps.length,
  });

  return (
    <>
      {/* ステッパーUI部分 */}
      <Stepper
        colorScheme="green"
        index={activeStep}
        steps={steps}
        size={{ base: "lg", md: "sm" }}
        orientation="horizontal"
      />
      {renderItem({ onStepNext, onStepPrev })[activeStep]}
    </>
  );
};

export default RegistrationStepper;
