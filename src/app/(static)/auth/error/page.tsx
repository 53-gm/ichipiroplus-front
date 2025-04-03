"use client";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  HStack,
  Heading,
  Text,
  VStack,
} from "@yamada-ui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const AuthErrorPage = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  // エラーメッセージのマッピング
  const errorMessages: Record<string, { title: string; description: string }> =
    {
      AccessDenied: {
        title: "アクセスが拒否されました",
        description:
          "このアプリケーションは広島市立大学のメールアドレスを持つユーザーのみ利用できます。",
      },
      Default: {
        title: "認証エラー",
        description: "ログイン中に問題が発生しました。もう一度お試しください。",
      },
    };

  const errorInfo = errorMessages[error || ""] || errorMessages.Default;

  return (
    <Container centerContent py={16}>
      <Card variant="outline" w="full" maxW="2xl" shadow="lg" overflow="hidden">
        <CardHeader bg="red.500" p={6} color="white">
          <Center>
            <Heading size="xl">認証エラー</Heading>
          </Center>
        </CardHeader>

        <CardBody>
          <VStack gap={6} align="stretch">
            <Alert
              status="error"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              py={6}
            >
              <AlertIcon boxSize="40px" />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                {errorInfo.title}
              </AlertTitle>
              <AlertDescription maxW="sm">
                {errorInfo.description}
              </AlertDescription>
            </Alert>

            <Text textAlign="center">以下のオプションからお選びください：</Text>

            <HStack gap={4} justify="center">
              <Link href="/auth/login" passHref>
                <Button variant="outline" colorScheme="blue">
                  ログイン画面に戻る
                </Button>
              </Link>

              <Link href="/" passHref>
                <Button colorScheme="blue">ホームに戻る</Button>
              </Link>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default AuthErrorPage;
