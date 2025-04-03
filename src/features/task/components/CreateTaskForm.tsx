"use client";

import {
  type Task,
  type TaskFormData,
  taskFormSchema,
} from "@/features/task/types";
import type { Registration } from "@/features/timetable/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DatePicker } from "@yamada-ui/calendar";
import {
  Box,
  Button,
  FormControl,
  Input,
  Radio,
  RadioGroup,
  Select,
  type SelectItem,
  Tag,
  Textarea,
  VStack,
} from "@yamada-ui/react";
import "dayjs/locale/ja";
import { useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { useTaskContext } from "../context/TaskContext";

interface CreateTaskFormProps {
  onSuccess?: (newTask: Task) => void;
  registrations?: Registration[];
  defaultRegistrationId?: string; // デフォルトの講義ID
}

const CreateTaskForm = ({
  onSuccess,
  registrations,
  defaultRegistrationId,
}: CreateTaskFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addTask } = useTaskContext();

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
      registration_id: defaultRegistrationId,
      priority: 1,
      status: 0,
    },
  });

  const lectureItems: SelectItem[] | undefined = registrations?.map(
    registration => ({
      label: registration.lecture.name,
      value: String(registration.id),
    }),
  );

  const handleFormSubmit: SubmitHandler<TaskFormData> = async data => {
    setIsSubmitting(true);
    try {
      // defaultLectureIdが設定されていて、lecture_idが未設定の場合はdefaultLectureIdを使用
      if (defaultRegistrationId && !data.registration_id) {
        data.registration_id = defaultRegistrationId;
      }

      const newTask = await addTask(data);

      reset();
      onSuccess?.(newTask);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      bg={["white", "black"]}
      p={4}
      borderWidth="1px"
      borderRadius="md"
      shadow="sm"
    >
      <VStack>
        {/* タイトル */}
        <FormControl
          label="タイトル"
          invalid={!!errors.title}
          required
          requiredIndicator={
            <Tag size="sm" colorScheme="danger" ms={2}>
              必須
            </Tag>
          }
        >
          <Input placeholder="タスクのタイトル" {...register("title")} />
        </FormControl>

        {/* 講義（オプション） */}
        {lectureItems && (
          <FormControl label="講義" invalid={!!errors.title}>
            <Controller
              name="registration_id"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="講義を選択"
                  {...field}
                  items={lectureItems}
                  value={field.value || undefined}
                  onChange={value => field.onChange(value)}
                />
              )}
            />
          </FormControl>
        )}

        {/* 詳細 */}

        <FormControl label="詳細">
          <Textarea
            placeholder="タスクの詳細を入力してください"
            {...register("description")}
            rows={3}
          />
        </FormControl>

        {/* 期限 */}

        <FormControl label="期限" isInvalid={!!errors.due_date}>
          <Controller
            name="due_date"
            control={control}
            render={({ field }) => (
              <DatePicker
                placeholder="YYYY/MM/DD"
                {...field}
                value={field.value || undefined}
                onChange={value => field.onChange(value)}
              />
            )}
          />
        </FormControl>

        {/* 優先度 */}

        <FormControl label="優先度" isInvalid={!!errors.priority}>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <RadioGroup
                direction="row"
                {...field}
                value={String(field.value)}
                onChange={value => field.onChange(Number(value))}
              >
                <Radio value="0">低</Radio>
                <Radio value="1">中</Radio>
                <Radio value="2">高</Radio>
              </RadioGroup>
            )}
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          alignSelf="flex-end"
          isLoading={isSubmitting}
        >
          タスクを作成
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateTaskForm;
