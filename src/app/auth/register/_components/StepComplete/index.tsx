import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Link,
} from "@yamada-ui/react";

interface StepCompleteProps {
  onStepNext: () => void;
  onStepPrev: () => void;
}

const StepComplete = ({}: StepCompleteProps) => {
  return (
    <Card variant="outline" bg="white" p="md" maxW="4xl" w="4xl">
      <CardHeader>
        <Heading size="xl">登録完了</Heading>
      </CardHeader>

      <CardBody>
        <Link href="/">
          <Button>ダッシュボードへ</Button>
        </Link>
      </CardBody>
    </Card>
  );
};

export default StepComplete;
