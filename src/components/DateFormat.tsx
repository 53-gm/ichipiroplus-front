import { format } from "@formkit/tempo";
import { HStack, Text } from "@yamada-ui/react";
import { ReactNode } from "react";

interface DateFormatProps {
  createdAt: string;
  updatedAt: string;
  createMessage?: string | ReactNode;
  updateMessage?: string | ReactNode;
}

const DateFormat = ({
  createdAt,
  updatedAt,
  createMessage = "登録日",
  updateMessage = "最終更新日",
}: DateFormatProps) => {
  const formattedCreatedDate = format(createdAt, "short", "ja");
  const formattedUpdatedDate = format(updatedAt, "short", "ja");

  const isDisplayUpdatedDate = formattedCreatedDate !== formattedUpdatedDate;

  return (
    <HStack gap={1} fontSize={{ base: "sm", md: "xs" }}>
      {isDisplayUpdatedDate && (
        <Text color="gray.500">
          {updateMessage} {formattedUpdatedDate}
        </Text>
      )}
      <Text color="gray.500">
        {createMessage} {formattedCreatedDate}
      </Text>
    </HStack>
  );
};

export default DateFormat;
