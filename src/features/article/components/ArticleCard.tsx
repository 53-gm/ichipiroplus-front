import DateFormat from "@/components/DateFormat";
import { RefreshCwIcon } from "@yamada-ui/lucide";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Text,
  VStack,
} from "@yamada-ui/react";
import Link from "next/link";
import { Article } from "../types";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  // 記事へのリンクパス
  const articlePath = `/${article.author.profile_id}/articles/${article.slug}`;
  // 著者プロフィールへのリンクパス
  const authorProfilePath = `/${article.author.profile_id}`;

  return (
    <Card border="1px solid" borderColor="gray.500" w="full" h="full">
      <Link href={articlePath} style={{ width: "100%" }}>
        <CardHeader>
          <Heading as="h3" size="md" transition="color 0.2s">
            {article.title}
          </Heading>
        </CardHeader>
      </Link>

      <CardBody>
        <VStack w="full" gap={4} align="start">
          <DateFormat
            createdAt={article.created_at}
            updatedAt={article.updated_at}
            createMessage="投稿日"
            updateMessage={<RefreshCwIcon />}
          />

          {/* 投稿情報 */}

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
                  {article.author.display_name || "名前未設定"}
                </Text>

                <Text color="gray.500" fontSize="xs">
                  @{article.author.profile_id}
                </Text>
              </VStack>
            </HStack>
          </Link>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ArticleCard;
