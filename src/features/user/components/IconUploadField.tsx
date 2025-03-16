import { uploadImage } from "@/features/article/api";
import { XIcon } from "@yamada-ui/lucide";
import {
  Avatar,
  Box,
  Center,
  FormControl,
  IconButton,
  Input,
  Text,
} from "@yamada-ui/react";
import { useState } from "react";
import { Control, useController } from "react-hook-form";
import { ProfileFormData } from "../types";

interface IconUploadFieldProps {
  control: Control<ProfileFormData>;
  label?: string;
  username: string;
  defaultValue?: string;
}

const IconUploadField = ({
  control,
  username,
  defaultValue,
}: IconUploadFieldProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({
    name: "picture",
    control,
    defaultValue: defaultValue || null,
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ファイルタイプのバリデーション
    if (!file.type.startsWith("image/")) {
      return;
    }

    // アップロード処理
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadImage(formData);
      onChange(result.url);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    onChange(null);
  };

  return (
    <FormControl isInvalid={!!error} label="アイコン">
      <Box position="relative" w="full">
        <Center>
          <Avatar
            src={value || undefined}
            key={username + value}
            name={username}
            alt="アイコンプレビュー"
            boxSize="120px"
            objectFit="cover"
            borderRadius="full"
            border="3px solid"
            borderColor={["white", "black"]}
          >
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              position="absolute"
              opacity="0"
              w="full"
              h="full"
              top="0"
              left="0"
              cursor="pointer"
            />
          </Avatar>
        </Center>
        {value && (
          <IconButton
            aria-label="Remove image"
            position="absolute"
            top="-8px"
            right="-8px"
            size="sm"
            icon={<XIcon />}
            colorScheme="red"
            onClick={handleRemoveImage}
            boxShadow="md"
            zIndex="2"
            rounded="full"
          />
        )}
      </Box>

      {isUploading && (
        <Center py={4}>
          <Text>アップロード中...</Text>
        </Center>
      )}
    </FormControl>
  );
};

export default IconUploadField;
