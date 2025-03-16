"use client";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from "@yamada-ui/react";
import { Lecture } from "../types";
import UpdateLectureForm from "./UpdateLectureForm";

interface UpdateLectureModalProps {
  open: boolean;
  onClose: () => void;
  lecture: Lecture;
}

const UpdateLectureModal = ({
  open,
  onClose,
  lecture,
}: UpdateLectureModalProps) => {
  return (
    <Modal open={open}>
      <ModalCloseButton onClick={onClose} />

      <ModalHeader>講義の編集</ModalHeader>

      <ModalBody>
        <UpdateLectureForm lecture={lecture} onRegisterSuccess={onClose} />
      </ModalBody>
    </Modal>
  );
};

export default UpdateLectureModal;
