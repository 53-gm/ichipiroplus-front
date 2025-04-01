"use client";

import type { Task } from "@/features/task/types";
import type { Registration } from "@/features/timetable/types";
import { PlusIcon } from "@yamada-ui/lucide";
import { Box, Button, VStack, useDisclosure } from "@yamada-ui/react";
import { TaskProvider, useTaskContext } from "../context/TaskContext";
import CreateTaskForm from "./CreateTaskForm";
import DeleteCompletedTasksDialog from "./DeleteCompletedTasksDialog";
import DeleteTaskDialog from "./DeleteTaskDialog";
import EditTaskModal from "./EditTaskModal";
import TaskColumn from "./TaskColumn";

interface TasksDashboardProps {
  initialTasks: Task[];
  registrations?: Registration[];
  registration_id?: string;
}

const TasksDashboard = ({
  initialTasks,
  registrations,
  registration_id,
}: TasksDashboardProps) => {
  return (
    <TaskProvider initialTasks={initialTasks} registrationId={registration_id}>
      <TaskDashboardContent
        registrations={registrations}
        registration_id={registration_id}
      />
    </TaskProvider>
  );
};

function TaskDashboardContent({
  registrations,
  registration_id,
}: {
  registrations?: Registration[];
  registration_id?: string;
}) {
  const { open, onToggle } = useDisclosure();
  const {
    todoTasks,
    inProgressTasks,
    completedTasks,
    selectedTask,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isDeleteCompletedDialogOpen,
    setIsDeleteCompletedDialogOpen,
    removeTask,
    removeCompletedTasks,
  } = useTaskContext();

  return (
    <Box w="full">
      <Box w="full">
        <Button
          leftIcon={<PlusIcon />}
          onClick={onToggle}
          colorScheme="blue"
          size="sm"
          mb={4}
        >
          {open ? "キャンセル" : "タスクを追加"}
        </Button>

        {open && (
          <CreateTaskForm
            registrations={registrations}
            defaultRegistrationId={registration_id}
            onSuccess={() => onToggle()}
          />
        )}
      </Box>

      {/* タスクボード */}
      <VStack>
        {/* 未着手タスク */}
        <TaskColumn title="未着手" tasks={todoTasks} />

        {/* 進行中タスク */}
        <TaskColumn title="進行中" tasks={inProgressTasks} />

        {/* 完了タスク */}
        <TaskColumn
          title="完了"
          tasks={completedTasks}
          extraHeader={
            completedTasks.length > 0 && (
              <Button
                size="xs"
                colorScheme="red"
                variant="outline"
                onClick={() => setIsDeleteCompletedDialogOpen(true)}
              >
                完了タスクをすべて削除
              </Button>
            )
          }
        />
      </VStack>

      {/* モーダルとダイアログ */}
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={selectedTask}
        registrations={registrations}
      />

      {selectedTask && (
        <DeleteTaskDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onDelete={() => removeTask(selectedTask.id)}
        />
      )}

      <DeleteCompletedTasksDialog
        isOpen={isDeleteCompletedDialogOpen}
        onClose={() => setIsDeleteCompletedDialogOpen(false)}
        onDelete={removeCompletedTasks}
        taskCount={completedTasks.length}
      />
    </Box>
  );
}

export default TasksDashboard;
