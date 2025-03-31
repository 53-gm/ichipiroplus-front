"use client";

import { ApiError } from "@/lib/api/client";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Spacer,
  Tag,
  Text,
  Tooltip,
  useNotice,
  VStack,
} from "@yamada-ui/react";
import { useRouter } from "next/navigation";
import { registerLecture } from "../api/registration";
import { Lecture } from "../types";
import UpdateLectureButton from "./UpdateLectureButton";

interface LectureCardProps {
  lecture: Lecture;
  userProfileId: string;
  year: number;
}

const LectureCard = ({ lecture, userProfileId, year }: LectureCardProps) => {
  const notice = useNotice({ isClosable: true });
  const router = useRouter();

  const handleRegister = async (id: string) => {
    try {
      const register = await registerLecture(id, year);
      notice({
        title: "通知",
        description: `${register.lecture.name}を登録しました`,
        status: "success",
      });
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError) {
        notice({
          title: "エラー",
          description: error.message,
          status: "error",
        });
      } else {
        notice({
          title: "エラー",
          description: "不明なエラーが発生しました",
          status: "error",
        });
      }
    }
  };

  return (
    <>
      <Card
        border="1px solid"
        borderColor="gray.300"
        borderRadius="md"
        bg={["white", "black"]}
        w="full"
      >
        <CardHeader>
          <HStack gap="sm">
            <Tooltip label="シラバスID" placement="top">
              <Tag variant="subtle" colorScheme="blue">
                {lecture.syllabus || "シラバス無"}
              </Tag>
            </Tooltip>

            {lecture.is_required && (
              <Tag variant="solid" colorScheme="red">
                必修
              </Tag>
            )}

            {lecture.is_exam && <Tag variant="solid">期末テスト</Tag>}
          </HStack>

          <Spacer />

          <UpdateLectureButton
            lecture={lecture}
            userProfileId={userProfileId}
          />
        </CardHeader>
        <CardBody>
          <HStack w="full">
            <VStack>
              <Text fontSize="xl" fontWeight="bold">
                {lecture.name}
              </Text>

              <Text lineClamp={1}>
                <strong>担当教員:</strong>
                {lecture.instructor}
              </Text>
              <Text>
                <strong>教室:</strong> {lecture.room}
              </Text>

              <Text>
                <strong>備考:</strong> {lecture.biko}
              </Text>
            </VStack>

            <Spacer />

            {/* 既存の講義を登録 */}
            <Button alignSelf="end" onClick={() => handleRegister(lecture.id)}>
              登録
            </Button>
          </HStack>
        </CardBody>
      </Card>
    </>
  );
};

export default LectureCard;
