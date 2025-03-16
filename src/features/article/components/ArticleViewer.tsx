"use client";

import { VStack } from "@yamada-ui/react";
import { Article } from "../types";
import ArticleViewerContent from "./ArticleViewerContent";
import ArticleViewerHeader from "./ArticleViewerHeader";

interface ArticleViewerProps {
  article: Article;
  isAuthor: boolean;
}

const ArticleViewer = ({ article, isAuthor }: ArticleViewerProps) => {
  return (
    <VStack w="full" align="start">
      <ArticleViewerHeader article={article} isAuthor={isAuthor} />
      <ArticleViewerContent article={article} />
    </VStack>
  );
};

export default ArticleViewer;
