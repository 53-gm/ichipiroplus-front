import { signIn, signOut } from "@/lib/auth";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
} from "@yamada-ui/react";

const LoginPage = (props: {
  searchParams: { callbackUrl: string | undefined };
}) => {
  return (
    <Container centerContent>
      <Card variant="outline" width={{ base: "700px", md: "300px" }}>
        <CardHeader>
          <Heading size="lg">Login</Heading>
        </CardHeader>

        <CardBody>
          <form
            action={async () => {
              "use server";
              await signIn("microsoft-entra-id", {
                redirectTo: props.searchParams.callbackUrl ?? "",
              });
            }}
          >
            <Button type="submit">Microsoftログイン</Button>
          </form>

          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit">ログアウト</Button>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default LoginPage;
