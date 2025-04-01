import EditorBox from "@/features/editor/components/EditorBox";
import { TableOfContents } from "@/features/editor/extensions/TableOfContents";
import { CustomBubbleMenu } from "@/features/editor/menus";
import { type Editor, EditorContent } from "@tiptap/react";
import { Box, Stack } from "@yamada-ui/react";

interface ArticleEditorContentProps {
  editor: Editor;
  showTableOfContents?: boolean;
  showBubbleMenu?: boolean;
  isEditable?: boolean;
}

const ArticleEditorContent = ({
  editor,
  showTableOfContents = true,
  showBubbleMenu = true,
  isEditable = false,
}: ArticleEditorContentProps) => {
  const EditorWrapper = isEditable ? EditorBox : Box;

  return (
    <Box as="article" py={4} w="full" minH="50vh">
      <Stack
        alignItems={{ base: "stretch", md: "center" }}
        gap="lg"
        direction={{ base: "row", md: "column" }}
      >
        <EditorWrapper w="full" minH="100vh" editor={editor}>
          <EditorContent editor={editor} />
          {showBubbleMenu && <CustomBubbleMenu editor={editor} />}
        </EditorWrapper>
        {showTableOfContents && (
          <Box w="sm">
            <TableOfContents editor={editor} />
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default ArticleEditorContent;
