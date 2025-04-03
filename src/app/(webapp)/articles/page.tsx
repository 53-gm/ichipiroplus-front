import { getArticles } from "@/features/article/api";
import ArticleList from "@/features/article/components/ArticleList";
import { PlusIcon } from "@yamada-ui/lucide";
import { Button, Flex, HStack, Heading } from "@yamada-ui/react";
import Link from "next/link";

interface ArticlesPageProps {
  searchParams: { page?: string };
}

const ArticlesPage = async ({ searchParams }: ArticlesPageProps) => {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const articles = await getArticles(page);

  return (
    <Flex direction="column" w="full" gap={6}>
      <Flex
        w="full"
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align={{ base: "start", md: "center" }}
        gap={4}
      >
        <Heading as="h1" size="xl">
          記事一覧
        </Heading>

        <HStack>
          <Link href="/articles/new" passHref>
            <Button colorScheme="blue" startIcon={<PlusIcon />}>
              新規記事
            </Button>
          </Link>
        </HStack>
      </Flex>

      <ArticleList data={articles} />
    </Flex>
  );
};

export default ArticlesPage;
