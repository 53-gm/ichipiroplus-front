"use client";

import { Task } from "@/features/task/types";
import { format } from "@formkit/tempo";
import {
  CircleCheckBigIcon,
  CircleIcon,
  EllipsisIcon,
} from "@yamada-ui/lucide";
import {
  Badge,
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@yamada-ui/react";
import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  showLecture?: boolean; // 講義情報を表示するかどうか
}

const TaskItem = ({
  task,
  onEdit,
  onDelete,
  showLecture = true, // デフォルトでは講義情報を表示
}: TaskItemProps) => {
  const { updateTaskStatus } = useTaskContext();
  const [isUpdating, setIsUpdating] = useState(false);

  // タスクの状態を切り替え
  const toggleTaskStatus = async () => {
    if (isUpdating) return;

    setIsUpdating(true);
    try {
      // 完了 ↔ 未完了 の切り替え
      const newStatus = task.status === 2 ? 0 : 2;
      await updateTaskStatus(task.id, newStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  // タスクのステータスを特定のステータスに更新
  const updateTaskToStatus = async (status: number) => {
    if (isUpdating || task.status === status) return;

    setIsUpdating(true);
    try {
      await updateTaskStatus(task.id, status);
    } finally {
      setIsUpdating(false);
    }
  };

  // 優先度に応じた色
  const priorityColor =
    {
      0: "green",
      1: "blue",
      2: "red",
    }[task.priority] || "gray";

  // 状態に応じたスタイル
  const isCompleted = task.status === 2;

  // フォーマットされた日付
  const formattedDueDate = task.due_date
    ? format(task.due_date, "short", "ja")
    : null;

  return (
    <Box
      p={3}
      borderWidth="1px"
      borderRadius="md"
      borderLeftWidth="4px"
      borderLeftColor={`${priorityColor}.500`}
      bg={["white", "black"]}
      opacity={isCompleted ? 0.7 : 1}
      _hover={{ shadow: "sm" }}
      transition="all 0.2s"
      position="relative"
    >
      {/* アクションボタン */}

      <Box position="absolute" top="8px" right="8px">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="タスクの操作"
            icon={<EllipsisIcon />}
            size="sm"
            variant="ghost"
          />
          <MenuList>
            <MenuItem
              onClick={() => updateTaskToStatus(0)}
              isDisabled={task.status === 0 || isUpdating}
            >
              未着手に移動
            </MenuItem>
            <MenuItem
              onClick={() => updateTaskToStatus(1)}
              isDisabled={task.status === 1 || isUpdating}
            >
              進行中に移動
            </MenuItem>
            <MenuItem
              onClick={() => updateTaskToStatus(2)}
              isDisabled={task.status === 2 || isUpdating}
            >
              完了に移動
            </MenuItem>
            <MenuItem onClick={() => onEdit(task)}>編集</MenuItem>
            <MenuItem onClick={() => onDelete(task)} color="red.500">
              削除
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>

      <Stack direction={{ base: "column", md: "row" }}>
        <HStack alignItems="flex-start" flex={1}>
          {/* チェックボックス */}
          <Tooltip
            label={isCompleted ? "タスクを未完了にする" : "タスクを完了する"}
          >
            <IconButton
              aria-label={
                isCompleted ? "タスクを未完了にする" : "タスクを完了する"
              }
              icon={isCompleted ? <CircleCheckBigIcon /> : <CircleIcon />}
              variant="ghost"
              colorScheme={isCompleted ? "green" : "gray"}
              size="sm"
              isLoading={isUpdating}
              onClick={toggleTaskStatus}
            />
          </Tooltip>

          {/* タスク情報 */}
          <VStack align="start" flex={1}>
            <Stack w="full" direction={{ base: "row", md: "column" }}>
              <Text
                fontWeight="medium"
                textDecoration={isCompleted ? "line-through" : "none"}
                color={isCompleted ? "gray.500" : "inherit"}
              >
                {task.title}
              </Text>

              {/* 講義名を表示（オプション） */}
              {showLecture && task.registration && (
                <Badge
                  colorScheme="purple"
                  variant="subtle"
                  alignSelf={{ base: "flex-start" }}
                >
                  {task.registration.lecture.name}
                </Badge>
              )}
            </Stack>

            {task.description && (
              <Text
                fontSize="sm"
                color={isCompleted ? "gray.400" : "gray.600"}
                textDecoration={isCompleted ? "line-through" : "none"}
              >
                {task.description}
              </Text>
            )}

            {/* メタ情報 */}
            <Flex
              fontSize="xs"
              color="gray.500"
              direction={{ base: "column", md: "row" }}
              align={{ base: "flex-start", md: "center" }}
            >
              {formattedDueDate && <Text>期限: {formattedDueDate}</Text>}
              <Text>
                優先度:
                <Badge ml={1} colorScheme={priorityColor} variant="subtle">
                  {task.priority === 0
                    ? "低"
                    : task.priority === 1
                    ? "中"
                    : "高"}
                </Badge>
              </Text>
            </Flex>
          </VStack>
        </HStack>
      </Stack>
    </Box>
  );
};

export default TaskItem;
