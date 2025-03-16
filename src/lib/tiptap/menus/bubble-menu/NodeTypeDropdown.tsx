import { Editor } from "@tiptap/core";
import {
  CheckIcon,
  ChevronDownIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListCollapseIcon,
  ListOrderedIcon,
  TypeIcon,
} from "@yamada-ui/lucide";
import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@yamada-ui/react";
import { useState } from "react";

export const NodeTypeDropdown = ({ editor }: { editor: Editor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonText = () => {
    if (editor.isActive("heading", { level: 1 })) {
      return "見出し1";
    }
    if (editor.isActive("heading", { level: 2 })) {
      return "見出し2";
    }
    if (editor.isActive("heading", { level: 3 })) {
      return "見出し3";
    }
    if (editor.isActive("orderedList")) {
      return "番号付きリスト";
    }
    if (editor.isActive("bulletList")) {
      return "箇条書きリスト";
    }

    return "テキスト";
  };

  const isOnlyParagraph =
    !editor.isActive("bulletList") &&
    !editor.isActive("orderedList") &&
    !editor.isActive("heading");

  return (
    <Menu>
      <MenuButton
        as={Button}
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        rounded="none"
        rightIcon={<ChevronDownIcon fontSize="sm" />}
      >
        {buttonText()}
      </MenuButton>

      <MenuList>
        {/* text */}
        <MenuItem onClick={() => editor.chain().focus().setParagraph().run()}>
          <HStack>
            <TypeIcon />
            <Text>テキスト</Text>
            {isOnlyParagraph && <CheckIcon />}
          </HStack>
        </MenuItem>

        {/* h1 */}
        <MenuItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <HStack>
            <Heading1Icon />
            <Text>見出し1</Text>
            {editor.isActive("heading", { level: 1 }) && <CheckIcon />}
          </HStack>
        </MenuItem>

        {/* h2 */}
        <MenuItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <HStack>
            <Heading2Icon />
            <Text>見出し2</Text>
            {editor.isActive("heading", { level: 2 }) && <CheckIcon />}
          </HStack>
        </MenuItem>

        {/* h3 */}
        <MenuItem
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <HStack>
            <Heading3Icon />
            <Text>見出し3</Text>
            {editor.isActive("heading", { level: 3 }) && <CheckIcon />}
          </HStack>
        </MenuItem>

        {/* OrderedList */}
        <MenuItem
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <HStack>
            <ListOrderedIcon />
            <Text>番号付きリスト</Text>
            {editor.isActive("orderedList") && <CheckIcon />}
          </HStack>
        </MenuItem>

        {/* BulletList */}
        <MenuItem
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <HStack>
            <ListCollapseIcon />
            <Text>箇条書きリスト</Text>
            {editor.isActive("bulletList") && <CheckIcon />}
          </HStack>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
