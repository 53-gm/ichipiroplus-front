"use client";

import { Task, TaskFormData, taskFormSchema } from "@/features/task/types";
import { Registration } from "@/features/timetable/types";
import { useTaskContext } from "../context/TaskContext";

import { ApiError } from "@/lib/api/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@yamada-ui/calendar";
import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
  useNotice,
  VStack,
} from "@yamada-ui/react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (updateTask: Task) => void;
  task: Task | null;
  registrations?: Registration[];
}

const EditTaskModal = ({
  isOpen,
  onClose,
  onSuccess,
  task,
  registrations,
}: EditTaskModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const notice = useNotice();
  const { editTask } = useTaskContext();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      registration_id: null,
      priority: 1,
      status: 0,
    },
  });

  // タスクが変更されたときにフォーム値をリセット
  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || "",
        registration_id: task.registration
          ? String(task.registration.id)
          : null,
        priority: task.priority,
        status: task.status,
        due_date: task.due_date ? new Date(task.due_date) : null,
      });
    }
  }, [task, reset]);

  const lectureItems: SelectItem[] | undefined = registrations?.map(
    (registration) => ({
      label: registration.lecture.name,
      value: String(registration.id),
    })
  );

  const onSubmit: SubmitHandler<TaskFormData> = async (data: TaskFormData) => {
    if (!task) {
      return;
    }
    setIsSubmitting(true);

    try {
      const updatedTask = await editTask(task.id, data);

      notice({
        title: "タスク更新",
        description: "タスクを更新しました",
        status: "success",
      });
      onSuccess?.(updatedTask);
      onClose();
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBody>
        <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>タスクを編集</ModalHeader>
          <ModalCloseButton />

          <VStack>
            {/* タイトル */}

            <FormControl isInvalid={!!errors.title} isRequired>
              <Input placeholder="タスクのタイトル" {...register("title")} />
            </FormControl>

            {/* 講義（オプション） */}
            {lectureItems && (
              <FormControl>
                <Controller
                  name="registration_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      placeholder="講義を選択(任意)"
                      {...field}
                      items={lectureItems}
                      value={field.value || undefined}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
              </FormControl>
            )}

            {/* 詳細 */}

            <FormControl>
              <Textarea
                placeholder="タスクの詳細を入力してください"
                {...register("description")}
                rows={3}
              />
            </FormControl>

            {/* 期限 */}

            <FormControl isInvalid={!!errors.due_date}>
              <Controller
                name="due_date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    placeholder="YYYY/MM/DD"
                    {...field}
                    value={field.value || undefined}
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
            </FormControl>

            {/* 優先度 */}

            <FormControl isInvalid={!!errors.priority}>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    value={String(field.value)}
                    onChange={(value) => field.onChange(Number(value))}
                  >
                    <Radio value="0">低</Radio>
                    <Radio value="1">中</Radio>
                    <Radio value="2">高</Radio>
                  </RadioGroup>
                )}
              />
            </FormControl>

            {/* 状態 */}

            <FormControl isInvalid={!!errors.status}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    value={String(field.value)}
                    onChange={(value) => field.onChange(Number(value))}
                  >
                    <Radio value="0">未着手</Radio>
                    <Radio value="1">進行中</Radio>
                    <Radio value="2">完了</Radio>
                  </RadioGroup>
                )}
              />
            </FormControl>
          </VStack>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              キャンセル
            </Button>
            <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
              保存
            </Button>
          </ModalFooter>
        </VStack>
      </ModalBody>
    </Modal>
  );
};

export default EditTaskModal;
