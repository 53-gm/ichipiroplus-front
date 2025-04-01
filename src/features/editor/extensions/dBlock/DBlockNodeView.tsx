/* eslint-disable jsx-a11y/no-static-element-interactions */

import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from "@tiptap/react";
import { GripVerticalIcon, PlusIcon } from "@yamada-ui/lucide";
import { Box, HStack, IconButton } from "@yamada-ui/react";
import type React from "react";
import { useMemo } from "react";

export const DBlockNodeView: React.FC<NodeViewProps> = ({
  node,
  getPos,
  editor,
}) => {
  const isTable = useMemo(() => {
    const { content } = node.content;

    return content[0].type.name === "table";
  }, [node.content]);

  const createNodeAfter = () => {
    const pos = getPos() + node.nodeSize;

    editor.commands.insertContentAt(pos, {
      type: "dBlock",
      content: [
        {
          type: "paragraph",
        },
      ],
    });
  };

  return (
    <NodeViewWrapper as="div" className="group">
      <Box position="relative">
        {/* コントロールバーを絶対位置で配置 */}
        {editor.isEditable && (
          <HStack
            position="absolute"
            left="0"
            top="0"
            bottom="0"
            w="12"
            alignItems="center"
            justifyItems="center"
            opacity="0"
            _groupHover={{ opacity: 100 }}
            transition="md"
            style={{ transform: "translateX(-110%)" }}
            gap="xs"
          >
            <IconButton
              variant="ghost"
              icon={<PlusIcon fontSize="lg" />}
              onClick={createNodeAfter}
              rounded="md"
              size="xs"
            />

            <IconButton
              variant="ghost"
              icon={<GripVerticalIcon fontSize="lg" />}
              contentEditable={false}
              draggable
              data-drag-handle
              rounded="lg"
              size="xs"
            />
          </HStack>
        )}

        {/* メインコンテンツは同じ位置を維持 */}
        <NodeViewContent className={` w-full ${isTable ? "ml-6" : ""}`} />
      </Box>
    </NodeViewWrapper>
  );
};
