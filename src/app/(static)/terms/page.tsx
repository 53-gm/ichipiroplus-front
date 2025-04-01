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
  title: "利用規約 | Ichipiro+",
  description: "Ichipiro+の利用規約について説明しています。",
};

const TermsOfServicePage = () => {
  return (
    <Card maxW="5xl" variant="outline" p="md" alignSelf="center">
      <CardHeader>
        <Heading as="h1" size="2xl" mb={8}>
          利用規約
        </Heading>
      </CardHeader>

      <CardBody>
        <Text>最終更新日: 2025年3月21日</Text>

        <Heading as="h2" size="xl">
          はじめに
        </Heading>

        <Text>
          この利用規約（以下「本規約」）は、Ichipiro+（以下「当サービス」）の利用条件を定めるものです。ユーザーが当サービスを利用する際には、本規約に同意したものとみなされます。本規約に同意できない場合は、当サービスの利用をお控えください。
        </Text>
        <Text mt="sm">
          <Tag colorScheme="danger" variant="solid" mr="sm">
            免責事項
          </Tag>
          Ichipiro+は個人または学生有志が運営する非公式のアプリケーションです。本サービスは広島市立大学の公式サービスではなく、広島市立大学とは直接の関係はありません。大学の公式情報は必ず大学の公式ウェブサイトや公式チャネルでご確認ください。
        </Text>

        <Heading as="h2" size="xl">
          サービスの概要
        </Heading>

        <Text>
          Ichipiro+は、学生向けの学習・時間管理支援プラットフォームであり、以下の機能を提供しています：
        </Text>
        <DecimalList>
          <ListItem>時間割管理</ListItem>
          <ListItem>タスク管理</ListItem>
          <ListItem>記事の作成・共有</ListItem>
          <ListItem>学術情報の管理</ListItem>
        </DecimalList>

        <Heading as="h2" size="xl">
          アカウント管理
        </Heading>

        <Text>
          当サービスはMicrosoft認証システムを利用してアカウント管理を行っています。以下の点にご注意ください：
        </Text>
        <DecimalList>
          <ListItem>
            当サービスへのログインには、Microsoftアカウントが必要です。
          </ListItem>
          <ListItem>
            認証情報の管理はMicrosoftのプライバシーポリシーに従います。
          </ListItem>
          <ListItem>
            アカウントを通じて行われるすべての活動はユーザーの責任となります。
          </ListItem>
          <ListItem>
            アカウントの不正使用や不正アクセスを発見した場合は、速やかに当サービスとMicrosoftにご連絡ください。
          </ListItem>
        </DecimalList>

        <Heading as="h2" size="xl">
          利用ルール
        </Heading>

        <Text>
          ユーザーは当サービスを利用するにあたり、以下の行為を行わないことに同意するものとします：
        </Text>
        <DecimalList>
          <ListItem>法令違反や公序良俗に反する行為</ListItem>
          <ListItem>他のユーザーへの嫌がらせや迷惑行為</ListItem>
          <ListItem>著作権、商標権等の知的財産権を侵害する行為</ListItem>
          <ListItem>当サービスの運営を妨害する行為</ListItem>
          <ListItem>不正アクセスやシステムへの攻撃行為</ListItem>
          <ListItem>虚偽情報の提供や詐欺的行為</ListItem>
          <ListItem>スパムや大量の広告配信行為</ListItem>
          <ListItem>マルウェアやウイルスの配布</ListItem>
          <ListItem>その他、当サービスが不適切と判断する行為</ListItem>
        </DecimalList>

        <Heading as="h2" size="xl">
          コンテンツの投稿
        </Heading>

        <Heading as="h3" size="md">
          ユーザーコンテンツ
        </Heading>
        <DecimalList>
          <ListItem>
            ユーザーは、当サービス上で記事やコメント等のコンテンツを投稿することができます。
          </ListItem>
          <ListItem>
            ユーザーが投稿したコンテンツの著作権はユーザー自身に帰属しますが、当サービスに対して、世界的、非独占的、無償、サブライセンス可能かつ譲渡可能な使用、複製、配布、派生著作物の作成、表示およびパフォーマンスの権利を許諾するものとします。
          </ListItem>
          <ListItem>
            投稿されたコンテンツに関する一切の責任はユーザー自身が負うものとします。
          </ListItem>
        </DecimalList>

        <Heading as="h3" size="md">
          禁止コンテンツ
        </Heading>
        <Text>以下のコンテンツの投稿は禁止されています：</Text>
        <DecimalList>
          <ListItem>他者の権利を侵害するコンテンツ</ListItem>
          <ListItem>
            違法、有害、脅迫的、虐待的、嫌がらせ、誹謗中傷的、差別的コンテンツ
          </ListItem>
          <ListItem>未成年者に有害なコンテンツ</ListItem>
          <ListItem>プライバシーを侵害するコンテンツ</ListItem>
          <ListItem>虚偽または誤解を招くコンテンツ</ListItem>
          <ListItem>スパムまたは商業的勧誘コンテンツ</ListItem>
          <ListItem>マルウェアを含むコンテンツ</ListItem>
          <ListItem>その他、当サービスが不適切と判断するコンテンツ</ListItem>
        </DecimalList>

        <Heading as="h2" size="xl">
          知的財産権
        </Heading>

        <DecimalList>
          <ListItem>
            当サービスのロゴ、デザイン、コード等の知的財産権は当サービスまたはそのライセンサーに帰属します。
          </ListItem>
          <ListItem>
            ユーザーは、当サービスの知的財産を、当サービスの明示的な許可なく使用、複製、修正、配布することはできません。
          </ListItem>
        </DecimalList>

        <Heading as="h2" size="xl">
          サービスの変更・中断・終了
        </Heading>

        <DecimalList>
          <ListItem>
            当サービスは、予告なくサービスの内容を変更、または一時的もしくは永続的に中断することがあります。
          </ListItem>
          <ListItem>
            当サービスは、ユーザーが本規約に違反した場合、予告なくアカウントを停止または削除することがあります。
          </ListItem>
          <ListItem>
            サービスの変更、中断、終了によってユーザーに生じた損害について、当サービスは一切の責任を負いません。
          </ListItem>
        </DecimalList>

        <Heading as="h2" size="xl">
          免責事項
        </Heading>

        <DecimalList>
          <ListItem>
            当サービスは「現状有姿」で提供され、明示または黙示を問わず、いかなる種類の保証も行いません。
          </ListItem>
          <ListItem>
            当サービスは、サービスの正確性、完全性、信頼性、適合性について保証しません。
          </ListItem>
          <ListItem>
            当サービスの利用により生じたいかなる損害についても、当サービスは責任を負いません。
          </ListItem>
          <ListItem>
            ユーザー間または第三者との間で生じたトラブルについては、ユーザー自身の責任で解決するものとします。
          </ListItem>
        </DecimalList>

        <Heading as="h2" size="xl">
          準拠法と管轄裁判所
        </Heading>

        <Text>
          本規約の解釈および適用は日本法に準拠し、本規約に関連する紛争については広島地方裁判所を第一審の専属的合意管轄裁判所とします。
        </Text>

        <Heading as="h2" size="xl">
          規約の変更
        </Heading>

        <Text>
          当サービスは、必要に応じて本規約を変更することがあります。重要な変更がある場合は、サービス内での通知やメールでお知らせします。変更後も当サービスを継続して利用する場合、ユーザーは変更後の規約に同意したものとみなされます。
        </Text>

        <Heading as="h2" size="xl">
          お問い合わせ
        </Heading>

        <Text>
          本規約に関するご質問やご意見は、以下の連絡先までお寄せください：
        </Text>

        <Text>メール: main@ichipiroplus.com</Text>
      </CardBody>
    </Card>
  );
};

export default TermsOfServicePage;
