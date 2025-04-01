import DateFormat from "@/components/DateFormat";
import { RefreshCwIcon } from "@yamada-ui/lucide";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from "@yamada-ui/react";
import Link from "next/link";
import type { Article } from "../types";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const articlePath = `/${article.author.profile_id}/articles/${article.slug}`;
  const authorProfilePath = `/${article.author.profile_id}`;

  return (
    <Card as={LinkBox} border="1px solid" borderColor="gray.500">
      <CardHeader>
        <Heading as="h3" size="md">
          <LinkOverlay href={articlePath}>{article.title}</LinkOverlay>
        </Heading>
      </CardHeader>

      <CardBody>
        {/* 投稿日、更新日 */}
        <DateFormat
          createdAt={article.created_at}
          updatedAt={article.updated_at}
          createMessage="投稿日"
          updateMessage={<RefreshCwIcon />}
        />

        {/* 著者情報 */}
        <Link href={authorProfilePath}>
          <HStack gap={3} rounded="md">
            <Avatar
              name={article.author.display_name || ""}
              src={article.author.picture || ""}
              size="sm"
              border="2px solid"
              borderColor={["white", "black"]}
              shadow="md"
            />
            <VStack align="start" gap="none">
              <Text fontWeight="bold" fontSize="sm">
                {article.author.display_name}
              </Text>

              <Text color="gray.500" fontSize="xs">
                @{article.author.profile_id}
              </Text>
            </VStack>
          </HStack>
        </Link>
      </CardBody>
    </Card>
  );
};

export default ArticleCard;
