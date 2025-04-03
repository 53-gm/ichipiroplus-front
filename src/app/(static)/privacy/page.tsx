import {
  Card,
  CardBody,
  CardHeader,
  DecimalList,
  Heading,
  ListItem,
  Tag,
  Text,
} from "@yamada-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Ichipiro+",
  description: "Ichipiro+のプライバシーポリシーについて説明しています。",
};

const PrivacyPolicyPage = () => {
  return (
    <Card maxW="5xl" variant="outline" p="md" alignSelf="center">
      <CardHeader>
        <Heading as="h1" size="2xl" mb={8}>
          プライバシーポリシー
        </Heading>
      </CardHeader>

      <CardBody>
        <Text>最終更新日: 2025年3月20日</Text>

        <Heading as="h2" size="xl">
          はじめに
        </Heading>

        <Text>
          Ichipiro+（以下「当サービス」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めています。本プライバシーポリシーでは、当サービスの利用に際して収集する情報、その使用方法、およびユーザーの権利について説明します。当サービスを利用することにより、ユーザーは本ポリシーに記載された条件に同意したものとみなされます。
        </Text>
        <Text mt="sm">
          <Tag colorScheme="danger" variant="solid" mr="sm">
            重要
          </Tag>
          Ichipiro+は個人または学生有志が運営する非公式のアプリケーションであり、広島市立大学の公式サービスではなく、同大学とは直接の関係はありません。
        </Text>

        <Heading as="h2" size="xl">
          収集する情報
        </Heading>

        <Text>
          当サービスでは、サービス提供のために以下のカテゴリの情報を収集することがあります：
        </Text>

        <Heading as="h3" size="md">
          1. アカウント情報
        </Heading>

        <Text>
          ユーザー登録やプロフィール設定に関する情報（氏名、メールアドレス、プロフィール画像、学部・学科情報、学年など）
        </Text>

        <Heading as="h3" size="md">
          2. 利用データ
        </Heading>

        <Text>
          サービスの利用に関する情報（時間割、タスク、記事などのコンテンツ、および各機能の利用状況など）
        </Text>

        <Heading as="h3" size="md">
          3. 技術データ
        </Heading>

        <Text>
          サービスの利用環境に関する情報（IPアドレス、ブラウザ情報、デバイス情報、アクセスログ、クッキー情報など）
        </Text>

        <Heading as="h2" size="xl">
          情報の利用目的
        </Heading>

        <Text>収集した情報は、以下の目的で利用します：</Text>
        <DecimalList>
          <ListItem>サービスの提供と維持</ListItem>
          <ListItem>ユーザー体験の向上</ListItem>
          <ListItem>サービスの改善と開発</ListItem>
          <ListItem>ユーザーサポートの提供</ListItem>
          <ListItem>サービスの利用状況の分析</ListItem>
          <ListItem>不正利用の防止</ListItem>
        </DecimalList>

        <Heading as="h2" size="xl">
          情報の共有
        </Heading>

        <Text>
          当サービスは、以下の場合を除き、ユーザーの個人情報を第三者と共有しません：
        </Text>
        <DecimalList>
          <ListItem>ユーザーの同意がある場合</ListItem>
          <ListItem>法的要請に応じる必要がある場合</ListItem>
          <ListItem>
            当サービスの権利、財産、安全を保護する必要がある場合
          </ListItem>
          <ListItem>事業譲渡や合併等の際に情報を引き継ぐ場合</ListItem>
        </DecimalList>

        <Heading as="h2" size="xl">
          クッキーの使用
        </Heading>

        <Text>
          当サービスでは、ユーザー体験の向上やセッション管理のためにクッキーを使用しています。ブラウザの設定でクッキーを無効にすることも可能ですが、一部の機能が利用できなくなる場合があります。
        </Text>

        <Heading as="h2" size="xl">
          データの保持期間
        </Heading>

        <Text>
          ユーザーアカウントが有効である限り、当サービスは収集した情報を保持します。アカウント削除後は、削除または匿名化されます。
        </Text>

        <Heading as="h2" size="xl">
          ユーザーの権利
        </Heading>

        <Text>ユーザーには以下の権利があります：</Text>
        <DecimalList>
          <ListItem>個人情報へのアクセス</ListItem>
          <ListItem>個人情報の訂正</ListItem>
          <ListItem>個人情報の削除（アカウント削除を含む）</ListItem>
          <ListItem>データポータビリティ（自分のデータの取得）</ListItem>
          <ListItem>処理の制限</ListItem>
          <ListItem>異議申し立て</ListItem>
        </DecimalList>
        <Text>
          これらの権利を行使するには、設定画面から操作するか、下記の連絡先までお問い合わせください。
        </Text>

        <Heading as="h2" size="xl">
          プライバシーポリシーの変更
        </Heading>

        <Text>
          当サービスは、必要に応じて本プライバシーポリシーを変更することがあります。重要な変更がある場合は、サービス内での通知やメールでお知らせします。
        </Text>

        <Heading as="h2" size="xl">
          お問い合わせ
        </Heading>

        <Text>
          本プライバシーポリシーに関するご質問やご意見は、以下の連絡先までお寄せください：
        </Text>

        <Text>メール: main@ichipiroplus.com</Text>
      </CardBody>
    </Card>
  );
};

export default PrivacyPolicyPage;
