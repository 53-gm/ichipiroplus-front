import { BubbleMenu, Editor } from "@tiptap/react";
import { NodeTypeDropdown } from "./NodeTypeDropdown";

import { IconButton } from "@yamada-ui/react";
import { generalButtons } from "./buttons";
import "./styles.css";

interface CustomBubbleMenuProps {
  editor: Editor;
}

export const CustomBubbleMenu: React.FC<CustomBubbleMenuProps> = ({
  editor,
}) => {
  return (
    <BubbleMenu
      editor={editor}
      className="bubble-menu"
      tippyOptions={{
        duration: 200,
        animation: "shift-toward-subtle",
        moveTransition: "transform 0.2s ease-in-out",
      }}
    >
      <NodeTypeDropdown editor={editor} />
      {generalButtons.map((btn) => {
        return (
          <IconButton
            icon={btn.icon}
            onClick={() => btn.action(editor)}
            key={btn.tooltip}
            variant="ghost"
            fontSize="sm"
            rounded="none"
          />
        );
      })}
    </BubbleMenu>
  );
};
