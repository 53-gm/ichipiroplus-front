import { getArticles } from "@/features/article/api";
import ArticleList from "@/features/article/components/ArticleList";
import { auth } from "@/lib/auth";
import { PlusIcon } from "@yamada-ui/lucide";
import { Button, Flex, Heading, HStack } from "@yamada-ui/react";
import Link from "next/link";

interface ArticlesPageProps {
  searchParams: { page?: string };
}

const ArticlesPage = async ({ searchParams }: ArticlesPageProps) => {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const articles = await getArticles(page);
  const currentUser = await auth();

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

        {currentUser && (
          <HStack>
            <Link href="/articles/new" passHref>
              <Button colorScheme="blue" leftIcon={<PlusIcon />}>
                新規記事
              </Button>
            </Link>
          </HStack>
        )}
      </Flex>

      <ArticleList data={articles} />
    </Flex>
  );
};

export default ArticlesPage;
