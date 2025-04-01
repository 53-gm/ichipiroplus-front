import {
  type Lecture,
  type LectureFormData,
  lectureFormSchema,
} from "@/features/timetable/types";
import { getAllDepartments } from "@/features/user/api";
import { ApiError } from "@/lib/api/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormControl,
  HStack,
  Input,
  MultiSelect,
  type SelectItem,
  Textarea,
  VStack,
  useNotice,
} from "@yamada-ui/react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { updateLecture } from "../api/lecture";

interface CustomLectureFormProps {
  lecture: Lecture;
  onRegisterSuccess?: (data: Lecture) => void;
}

const UpdateLectureForm = ({
  lecture,
  onRegisterSuccess,
}: CustomLectureFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LectureFormData>({
    resolver: zodResolver(lectureFormSchema),
    defaultValues: {
      schedule_ids: lecture.schedules.map(sch => String(sch.id)),
      department_ids: lecture.departments.map(d => String(d.id)),
      term_ids: lecture.terms.map(t => String(t.number)),
      ...lecture,
    },
  });

  const notice = useNotice({ isClosable: true });

  const onSubmit: SubmitHandler<LectureFormData> = async data => {
    try {
      const parsedData = lectureFormSchema.safeParse(data);
      if (!parsedData.success) {
        const errorMessages = parsedData.error.errors.map(err => err.message);
        throw new Error(errorMessages.join(", "));
      }

      if (!parsedData.data.department_ids) {
        const allDepartments = await getAllDepartments();
        parsedData.data.department_ids = allDepartments.map(d => String(d.id));
      }

      const updatedLecture = await updateLecture(lecture.id, {
        ...parsedData.data,
      });

      notice({
        title: "通知",
        description: "講義の更新に成功しました",
        status: "success",
      });
      onRegisterSuccess?.(updatedLecture);
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

  const scheduleItems: SelectItem[] = [];
  for (let day = 1; day <= 7; day++) {
    for (let time = 1; time <= 5; time++) {
      const item: SelectItem = {
        label: `${["月", "火", "水", "木", "金", "土", "日"][day - 1]}曜日${time}限`,
        value: String((day - 1) * 5 + time),
      };
      scheduleItems.push(item);
    }
  }

  const termItems: SelectItem[] = [
    { label: "第1ターム", value: "1" },
    { label: "第2ターム", value: "2" },
    { label: "第3ターム", value: "3" },
    { label: "第4ターム", value: "4" },
  ];

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)} w="full">
      <VStack align="start" w="full">
        <FormControl
          isInvalid={!!errors.name}
          label="講義名"
          errorMessage={errors.name?.message}
        >
          <Input placeholder="Lecture" {...register("name")} />
        </FormControl>

        <FormControl
          isInvalid={!!errors.syllabus}
          label="シラバスID"
          errorMessage={errors.syllabus?.message}
        >
          <Input placeholder="00000000" {...register("syllabus")} />
        </FormControl>

        <FormControl
          isInvalid={!!errors.room}
          label="教室"
          errorMessage={errors.room?.message}
        >
          <Input placeholder="講404" {...register("room")} />
        </FormControl>

        <FormControl
          isInvalid={!!errors.instructor}
          label="教員"
          errorMessage={errors.instructor?.message}
        >
          <Input placeholder="いちぴろくん" {...register("instructor")} />
        </FormControl>
      </VStack>

      <VStack align="start" w="full">
        <FormControl
          isInvalid={!!errors.biko}
          label="備考"
          errorMessage={errors.biko?.message}
        >
          <Textarea placeholder="備考" {...register("biko")} />
        </FormControl>

        <HStack w="full">
          <FormControl
            isInvalid={!!errors.term_ids}
            label="ターム(複数可)"
            errorMessage={errors.term_ids?.message}
          >
            <Controller
              name="term_ids"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  placeholder="タームを選択"
                  {...field}
                  items={termItems}
                />
              )}
            />
          </FormControl>
        </HStack>

        <FormControl
          isInvalid={!!errors.schedule_ids}
          label="日程(複数可)"
          errorMessage={errors.schedule_ids?.message}
        >
          <Controller
            name="schedule_ids"
            control={control}
            render={({ field }) => (
              <MultiSelect
                placeholder="日程を選択"
                {...field}
                items={scheduleItems}
              />
            )}
          />
        </FormControl>
      </VStack>

      <Button variant="outline" type="submit" w="full" mt={4}>
        決定
      </Button>
    </VStack>
  );
};

export default UpdateLectureForm;
