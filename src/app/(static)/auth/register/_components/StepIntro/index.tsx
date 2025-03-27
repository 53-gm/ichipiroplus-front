import { CalendarIcon, CircleCheckIcon, LibraryIcon } from "@yamada-ui/lucide";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Icon,
  List,
  ListItem,
  Separator,
  Text,
  VStack,
} from "@yamada-ui/react";

interface StepIntroProps {
  onStepNext: () => void;
  onStepPrev: () => void;
}

const StepIntro = ({ onStepNext }: StepIntroProps) => {
  return (
    <Card
      variant="outline"
      bg={["white", "black"]}
      p="md"
      w={{ base: "4xl", md: "sm" }}
    >
      <CardHeader>
        <Heading size="xl">Ichipiro+へようこそ</Heading>
      </CardHeader>

      <CardBody>
        <VStack gap={4} align="stretch">
          <Text>
            Ichipiro+をご利用頂きありがとうございます。このアプリは広島市立大学の学生生活をより充実したものにするためのツールです。
          </Text>

          <Separator />

          <Box>
            <Heading size="md" mb={2}>
              Ichipiro+でできること
            </Heading>
            <List gap={3} pl={4}>
              <ListItem>
                <Box display="flex" alignItems="center">
                  <Icon as={CalendarIcon} color="blue.500" mr={2} />
                  <Text fontWeight="bold">時間割管理：</Text>
                  <Text ml={1}>
                    授業スケジュールを簡単に管理し、いつでも確認できます
                  </Text>
                </Box>
              </ListItem>
              <ListItem>
                <Box display="flex" alignItems="center">
                  <Icon as={CircleCheckIcon} color="green.500" mr={2} />
                  <Text fontWeight="bold">タスク管理：</Text>
                  <Text ml={1}>
                    講義ごとの課題や締め切りを整理し、効率的に学習を進められます
                  </Text>
                </Box>
              </ListItem>
              <ListItem>
                <Box display="flex" alignItems="center">
                  <Icon as={LibraryIcon} color="purple.500" mr={2} />
                  <Text fontWeight="bold">記事作成・共有：</Text>
                  <Text ml={1}>
                    大学生活に関する情報を記事として保存・共有できます
                  </Text>
                </Box>
              </ListItem>
            </List>
          </Box>

          <Separator />

          <Box>
            <Heading size="md" mb={2}>
              プロフィール設定について
            </Heading>
            <Text>
              次のステップでは、あなたのプロフィール情報を設定していただきます。この情報は以下の目的で使用されます：
            </Text>
            <List mt={2} pl={4}>
              <ListItem>時間割やタスクの個人設定</ListItem>
              <ListItem>学部・学科に合わせた講義情報の表示</ListItem>
              <ListItem>記事を投稿する際の著者情報</ListItem>
            </List>
            <Text mt={2} fontStyle="italic" color="gray.600">
              ※ユーザーIDを除き、設定した情報は後からいつでも変更できます
            </Text>
          </Box>

          <Box bg="blue.50" p={4} borderRadius="md">
            <Text fontWeight="bold" color="blue.700">
              Ichipiro+は広島市立大学の公式サービスではなく、学生有志が運営する非公式のアプリケーションです。大学の公式情報は必ず大学の公式ウェブサイトや公式チャネルでご確認ください。
            </Text>
          </Box>
        </VStack>
      </CardBody>

      <CardFooter>
        <Button colorScheme="blue" onClick={onStepNext} w="full">
          次へ進む
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StepIntro;
