import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
} from "@yamada-ui/react";

interface StepIntroProps {
  onStepNext: () => void;
  onStepPrev: () => void;
}

const StepIntro = ({ onStepNext }: StepIntroProps) => {
  return (
    <Card variant="outline" bg="white" p="md" w={{ base: "4xl", md: "sm" }}>
      <CardHeader>
        <Heading size="xl">はじめに</Heading>
      </CardHeader>

      <CardBody>
        <Text>test</Text>
      </CardBody>

      <Button onClick={onStepNext}>次へ</Button>
    </Card>
  );
};

export default StepIntro;
