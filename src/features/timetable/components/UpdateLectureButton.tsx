"use client";

import { FilePenIcon } from "@yamada-ui/lucide";
import { IconButton, useDisclosure } from "@yamada-ui/react";
import type { Lecture } from "../types";
import UpdateLectureModal from "./UpdateLectureModal";

interface UpdateLectureButtonProps {
  lecture: Lecture;
  userProfileId: string;
}

const UpdateLectureButton = ({
  lecture,
  userProfileId,
}: UpdateLectureButtonProps) => {
  const { open, onOpen, onClose } = useDisclosure();
  return (
    <>
      {(lecture.is_public_editable ||
        lecture.owner?.profile_id === userProfileId) && (
        <IconButton icon={<FilePenIcon />} variant="outline" onClick={onOpen} />
      )}
      <UpdateLectureModal open={open} onClose={onClose} lecture={lecture} />
    </>
  );
};

export default UpdateLectureButton;
