import { Heading, HStack, Link, Text, VStack } from "@yamada-ui/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <HStack as="footer" py="md" px={{ base: "lg", md: "md" }} mt="lg" w="full">
      <HStack>
        <VStack gap="xs">
          <Text>
            <Heading as="span" fontFamily="sans-serif">
              I
            </Heading>
            <Heading as="span">chipiro+</Heading>
          </Text>
          <Text>フッターは気が向いたら作ります</Text>
        </VStack>
      </HStack>

      <VStack align="center" maxW="6xl" mx="auto">
        <HStack fontSize="sm" color="gray.600" flexWrap="wrap" justify="center">
          <Link href="/" _hover={{ color: "blue.500" }}>
            ホーム
          </Link>
          <Link href="/timetable" _hover={{ color: "blue.500" }}>
            時間割
          </Link>
          <Link href="/articles" _hover={{ color: "blue.500" }}>
            記事
          </Link>
          <Link href="/settings" _hover={{ color: "blue.500" }}>
            設定
          </Link>
          <Link href="/privacy" _hover={{ color: "blue.500" }}>
            プライバシーポリシー
          </Link>
          <Link href="/terms" _hover={{ color: "blue.500" }}>
            利用規約
          </Link>
        </HStack>

        <Text fontSize="xs" color="gray.500">
          © {currentYear} いちぴろ・エクスプローラ. All rights reserved.
        </Text>
      </VStack>
    </HStack>
  );
};

export default Footer;
