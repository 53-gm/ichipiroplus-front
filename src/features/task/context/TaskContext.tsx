"use client";

import {
  createTask,
  deleteTask,
  getAllTasks,
  getTasksByRegistrationId,
  updateTask,
} from "@/features/task/api";
import { Task, TaskFormData } from "@/features/task/types";
import { Registration } from "@/features/timetable/types";
import { ApiError } from "@/lib/api/client";
import { useNotice } from "@yamada-ui/react";
import { createContext, ReactNode, useContext, useState } from "react";
import useSWR from "swr";

// タスクの状態と操作を含むコンテキスト型
interface TaskContextType {
  // データと状態
  tasks: Task[] | undefined;
  todoTasks: Task[];
  inProgressTasks: Task[];
  completedTasks: Task[];
  isLoading: boolean;
  isValidating: boolean;

  // タスク操作
  updateTaskStatus: (taskId: string, status: number) => Promise<void>;
  addTask: (data: TaskFormData) => Promise<Task>;
  editTask: (taskId: string, data: Partial<TaskFormData>) => Promise<Task>;
  removeTask: (taskId: string) => Promise<boolean>;
  removeCompletedTasks: () => Promise<boolean>;

  // UI状態
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (isOpen: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  isDeleteCompletedDialogOpen: boolean;
  setIsDeleteCompletedDialogOpen: (isOpen: boolean) => void;
}

// デフォルト値
const defaultContext: TaskContextType = {
  tasks: undefined,
  todoTasks: [],
  inProgressTasks: [],
  completedTasks: [],
  isLoading: false,
  isValidating: false,
  updateTaskStatus: async () => {},
  addTask: async () => ({
    id: "",
    title: "",
    description: "",
    priority: 0,
    status: 0,
    due_date: null,
    created_at: "",
    updated_at: "",
    registration: {} as Registration,
  }),
  editTask: async () => ({
    id: "",
    title: "",
    description: "",
    priority: 0,
    status: 0,
    due_date: null,
    created_at: "",
    updated_at: "",
    registration: {} as Registration,
  }),
  removeTask: async () => false,
  removeCompletedTasks: async () => false,
  selectedTask: null,
  setSelectedTask: () => {},
  isEditModalOpen: false,
  setIsEditModalOpen: () => {},
  isDeleteDialogOpen: false,
  setIsDeleteDialogOpen: () => {},
  isDeleteCompletedDialogOpen: false,
  setIsDeleteCompletedDialogOpen: () => {},
};

// コンテキストの作成
const TaskContext = createContext<TaskContextType>(defaultContext);

// コンテキストプロバイダー
export function TaskProvider({
  children,
  initialTasks = [],
  registrationId,
}: {
  children: ReactNode;
  initialTasks: Task[];
  registrationId?: string;
}) {
  const notice = useNotice();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleteCompletedDialogOpen, setIsDeleteCompletedDialogOpen] =
    useState(false);

  // SWRを使用してデータをフェッチ
  const {
    data: tasks,
    isLoading,
    isValidating,
    mutate: mutateTasks,
  } = useSWR<Task[]>(
    registrationId
      ? `/api/v1/tasks/tasks/?registration_id=${registrationId}`
      : "/api/v1/tasks/tasks/",
    () =>
      registrationId ? getTasksByRegistrationId(registrationId) : getAllTasks(),
    {
      fallbackData: initialTasks,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 5000,
    }
  );

  // フィルタリングされたタスク
  const todoTasks = tasks?.filter((task) => task.status === 0) || [];
  const inProgressTasks = tasks?.filter((task) => task.status === 1) || [];
  const completedTasks = tasks?.filter((task) => task.status === 2) || [];

  // タスクのステータスを更新
  const updateTaskStatus = async (taskId: string, status: number) => {
    try {
      // 楽観的UI更新
      const updatedTasks = tasks?.map((task) =>
        task.id === taskId ? { ...task, status } : task
      );

      mutateTasks(updatedTasks, false);

      // APIを呼び出して実際に更新
      await updateTask(taskId, { status });

      notice({
        title: "タスク更新",
        description: "タスクのステータスを更新しました",
        status: "success",
      });

      mutateTasks();
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

      mutateTasks();
    }
  };

  // 新しいタスクを作成
  const addTask = async (data: TaskFormData) => {
    try {
      const newTask = await createTask(data);

      mutateTasks((current) => [...(current || []), newTask], false);

      notice({
        title: "タスク作成",
        description: "新しいタスクを作成しました",
        status: "success",
      });

      return newTask;
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
      throw error;
    }
  };

  // タスクを編集
  const editTask = async (taskId: string, data: Partial<TaskFormData>) => {
    try {
      mutateTasks(
        tasks?.map((task) =>
          task.id === taskId
            ? { ...task, ...data, due_date: data.due_date?.toString() ?? null }
            : task
        ),
        false
      );

      // APIを呼び出して実際に更新
      const updatedTask = await updateTask(taskId, data);

      notice({
        title: "タスク更新",
        description: "タスクを更新しました",
        status: "success",
      });

      mutateTasks();

      return updatedTask;
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

      mutateTasks();
      throw error;
    }
  };

  // タスクを削除
  const removeTask = async (taskId: string) => {
    try {
      // 楽観的UI更新
      const filteredTasks = tasks?.filter((task) => task.id !== taskId);
      mutateTasks(filteredTasks, false);

      // APIを呼び出して実際に削除
      await deleteTask(taskId);

      notice({
        title: "タスク削除",
        description: "タスクを削除しました",
        status: "success",
      });

      mutateTasks();

      return true;
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

      mutateTasks();
      return false;
    }
  };

  // 完了タスクをすべて削除
  const removeCompletedTasks = async () => {
    if (!tasks) return false;

    const completedTasks = tasks.filter((task) => task.status === 2);
    if (completedTasks.length === 0) return false;

    try {
      // 楽観的UI更新
      const remainingTasks = tasks.filter((task) => task.status !== 2);
      mutateTasks(remainingTasks, false);

      // 各タスクを削除
      for (const task of completedTasks) {
        await deleteTask(task.id);
      }

      notice({
        title: "一括削除",
        description: `${completedTasks.length}件の完了タスクを削除しました`,
        status: "success",
      });

      mutateTasks();

      return true;
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

      mutateTasks();
      return false;
    }
  };

  // コンテキスト値
  const value: TaskContextType = {
    tasks,
    todoTasks,
    inProgressTasks,
    completedTasks,
    isLoading,
    isValidating,
    updateTaskStatus,
    addTask,
    editTask,
    removeTask,
    removeCompletedTasks,
    selectedTask,
    setSelectedTask,
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isDeleteCompletedDialogOpen,
    setIsDeleteCompletedDialogOpen,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

// カスタムフック
export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
}
