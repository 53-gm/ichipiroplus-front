"use client";

import TaskItem from "@/features/task/components/TaskItem";
import type { Task } from "@/features/task/types";
import { Box, Heading, HStack, Text, VStack } from "@yamada-ui/react";
import type { ReactNode } from "react";
import { useTaskContext } from "../context/TaskContext";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  extraHeader?: ReactNode;
}

const TaskColumn = ({ title, tasks, extraHeader }: TaskColumnProps) => {
  const { setSelectedTask, setIsEditModalOpen, setIsDeleteDialogOpen } =
    useTaskContext();

  // タスク編集
  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  // タスク削除ダイアログを開く
  const handleOpenDeleteDialog = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteDialogOpen(true);
  };

  return (
    <Box>
      <HStack justifyContent="space-between" mb={4}>
        <Heading size="sm">
          {title} ({tasks.length})
        </Heading>
        {extraHeader}
      </HStack>

      {tasks.length === 0 ? (
        <Box py={8} textAlign="center">
          <Text color="gray.500">タスクがありません</Text>
        </Box>
      ) : (
        <VStack align="stretch" maxH="lg" px={1}>
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={handleEditTask}
              onDelete={handleOpenDeleteDialog}
              showLecture={true} // 講義ページと区別するために常に講義名を表示
            />
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default TaskColumn;
