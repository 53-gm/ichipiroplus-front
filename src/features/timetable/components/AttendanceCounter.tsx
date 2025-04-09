"use client";

import {
  decrementAttendance,
  incrementAttendance,
} from "@/features/timetable/api/attendance";
import { ApiError } from "@/lib/api/client";
import { ExternalLinkIcon, MinusIcon, PlusIcon } from "@yamada-ui/lucide";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CircleProgress,
  CircleProgressLabel,
  Flex,
  Heading,
  IconButton,
  Text,
  Tooltip,
  VStack,
  useNotice,
} from "@yamada-ui/react";
import { useState } from "react";

interface AttendanceCounterProps {
  registrationId: string;
  initialCount: number;
  externalSystemUrl?: string;
  lectureName?: string;
}

const AttendanceCounter = ({
  registrationId,
  initialCount = 0,
  externalSystemUrl,
  lectureName = "講義",
}: AttendanceCounterProps) => {
  const [attendanceCount, setAttendanceCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);
  const notice = useNotice();

  const handleAttendanceIncrement = async () => {
    if (isLoading || attendanceCount >= 15) return;

    setIsLoading(true);
    try {
      const response = await incrementAttendance(registrationId);
      setAttendanceCount(response.attendance_count);

      notice({
        title: "出席登録",
        description: "出席を記録しました",
        status: "success",
      });
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
          description: "出席の記録に失敗しました",
          status: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAttendanceDecrement = async () => {
    if (isLoading || attendanceCount <= 0) return;

    setIsLoading(true);
    try {
      const response = await decrementAttendance(registrationId);
      setAttendanceCount(response.attendance_count);

      notice({
        title: "出席更新",
        description: "出席回数を減らしました",
        status: "info",
      });
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
          description: "出席の更新に失敗しました",
          status: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleExternalSystemNavigate = () => {
    if (externalSystemUrl) {
      window.open(externalSystemUrl, "_blank");
    }
  };

  const attendancePercentage = (attendanceCount / 15) * 100;

  // 進行状況に応じた色を設定
  const progressColor =
    attendancePercentage < 40
      ? "red"
      : attendancePercentage < 70
        ? "orange"
        : attendancePercentage < 90
          ? "yellow"
          : "green";

  return (
    <Card w="full">
      <CardHeader>
        <Heading size="md">出席管理</Heading>
      </CardHeader>
      <CardBody>
        <VStack gap={6} align="center">
          {/* 出席回数の説明 */}
          <Text align="center">
            {lectureName}の出席状況: {attendanceCount} / {15}回
          </Text>

          {/* 円形プログレスと操作ボタン */}
          <Flex align="center" justify="center" direction="row" gap={6}>
            {/* 減少ボタン */}
            <Tooltip label="出席回数を減らす">
              <IconButton
                aria-label="出席回数を減らす"
                icon={<MinusIcon />}
                onClick={handleAttendanceDecrement}
                isDisabled={isLoading || attendanceCount <= 0}
                colorScheme="red"
                variant="outline"
                size="lg"
                rounded="full"
              />
            </Tooltip>

            {/* 円形プログレス */}
            <CircleProgress
              value={attendancePercentage}
              boxSize={{ md: "80px", base: "150px" }}
              thickness="8px"
              color={progressColor}
            >
              <CircleProgressLabel fontSize="2xl" fontWeight="bold">
                {attendanceCount}
              </CircleProgressLabel>
            </CircleProgress>

            {/* 増加ボタン */}
            <Tooltip label="出席を記録する">
              <IconButton
                aria-label="出席を記録する"
                icon={<PlusIcon />}
                onClick={handleAttendanceIncrement}
                isDisabled={isLoading || attendanceCount >= 15}
                colorScheme="blue"
                variant="outline"
                rounded={"full"}
                size={"lg"}
              />
            </Tooltip>
          </Flex>

          {/* 外部システムボタン */}
          {externalSystemUrl && (
            <Button
              onClick={handleExternalSystemNavigate}
              rightIcon={<ExternalLinkIcon />}
              colorScheme="teal"
              variant="outline"
              mt={4}
              w="full"
              maxW="md"
            >
              学内出席システムへ移動
            </Button>
          )}

          {/* 注意事項 */}

          <Text color="orange.500" fontSize="sm" textAlign="center">
            注意: 学内の出席システム(UNIPA)とは同期しておりません。
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default AttendanceCounter;
