"use client";

import { updateUserProfile } from "@/features/user/api";
import {
  Department,
  Faculty,
  ProfileFormData,
  ProfileFormSchema,
  UserProfile,
} from "@/features/user/types";
import { ApiError } from "@/lib/api/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormControl,
  Input,
  NumberInput,
  Select,
  SelectItem,
  Tag,
  Text,
  Textarea,
  useNotice,
  VStack,
} from "@yamada-ui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import IconUploadField from "./IconUploadField";

interface MyProfileEditFormProps {
  departments: Department[];
  faculties: Faculty[];
  userProfile: UserProfile;
  onSuccess?: (data: ProfileFormData) => void;
  isFirst?: boolean;
}

const MyProfileEditForm = ({
  departments,
  faculties,
  userProfile,
  onSuccess,
  isFirst = false,
}: MyProfileEditFormProps) => {
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      profile_id: userProfile.profile_id,
      display_name: userProfile.display_name || "",
      introduction: userProfile.introduction || "",
      faculty_id: String(userProfile.faculty?.id) || "",
      department_id: String(userProfile.department?.id) || "",
      grade: userProfile.grade || 1,
    },
  });

  const notice = useNotice({
    style: { maxW: "80%", minW: "60%" },
    isClosable: true,
  });

  const facultyItems: SelectItem[] = faculties.map((faculty) => ({
    label: faculty.name,
    value: String(faculty.id),
  }));

  const availableDepartments = departments.filter(
    (department) => String(department.faculty.id) == watch("faculty_id")
  );
  const departmentItems: SelectItem[] = availableDepartments.map(
    (department) => ({
      label: department.name,
      value: String(department.id),
    })
  );

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    try {
      const parsedData = ProfileFormSchema.safeParse(data);
      if (!parsedData.success) {
        const errorMessages = parsedData.error.errors.map((err) => err.message);
        throw new Error(errorMessages.join(", "));
      }

      await updateUserProfile({
        ...parsedData.data,
      });

      notice({
        title: "通知",
        description: "プロフィールが更新されました。",
        status: "success",
        duration: 2000,
        variant: "left-accent",
      });
      onSuccess?.(data);
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
    <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
      <IconUploadField
        control={control}
        username={watch("display_name")}
        defaultValue={userProfile.picture || ""}
        errorMessage={errors.picture?.message}
      />

      <FormControl
        invalid={!!errors.display_name}
        label="名前(表示名)"
        errorMessage={errors.display_name?.message}
        required
        requiredIndicator={
          <Tag size="sm" colorScheme="danger" ms={2}>
            必須
          </Tag>
        }
      >
        <Input placeholder="Ichipiro" {...register("display_name")} />
      </FormControl>

      <FormControl
        invalid={!!errors.profile_id}
        label="ユーザーID"
        errorMessage={errors.profile_id?.message}
        required
        requiredIndicator={
          <Tag size="sm" colorScheme="danger" ms={2}>
            必須
          </Tag>
        }
        disabled={!isFirst}
        helperMessage={<Text>基本的に初回以降変更することが出来ません</Text>}
      >
        <Input placeholder="Ichipiro0003" {...register("profile_id")} />
      </FormControl>

      <FormControl
        invalid={!!errors.introduction}
        label="自己紹介"
        errorMessage={
          errors.introduction ? errors.introduction.message : undefined
        }
      >
        <Textarea placeholder="はじめまして" {...register("introduction")} />
      </FormControl>

      <FormControl
        invalid={!!errors.faculty_id}
        label="学部"
        errorMessage={errors.faculty_id?.message}
        helperMessage={"時間割機能を使用するために必要です"}
      >
        <Controller
          name="faculty_id"
          control={control}
          render={({ field }) => (
            <Select placeholder="学部を選択" {...field} items={facultyItems} />
          )}
        />
      </FormControl>

      <FormControl
        invalid={!!errors.department_id}
        label="学科"
        errorMessage={errors.department_id?.message}
        helperMessage={
          <>
            <Text>時間割機能を使用するために必要です</Text>
            <Text>※大学院の場合は○○研究科を選択してください</Text>
          </>
        }
      >
        <Controller
          name="department_id"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="学科を選択"
              {...field}
              items={departmentItems}
            />
          )}
        />
      </FormControl>

      <FormControl
        invalid={!!errors.grade}
        label="学年"
        errorMessage={errors.grade?.message}
        helperMessage={
          <>
            <Text>時間割機能を使用するために必要です</Text>
          </>
        }
      >
        <Controller
          name="grade"
          control={control}
          render={({ field }) => (
            <NumberInput
              {...field}
              min={1}
              max={4}
              onChange={(value) => field.onChange(Number(value))}
            />
          )}
        />
      </FormControl>

      <Button type="submit" alignSelf="flex-end">
        決定
      </Button>
    </VStack>
  );
};

export default MyProfileEditForm;
