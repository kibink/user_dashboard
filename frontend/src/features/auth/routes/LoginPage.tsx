import Card from "@/components/Card";
import LoginForm from "@/features/auth/components/LoginForm";
import CenteredLayout from "@/components/CenteredLayout";

export default function LoginPage() {
  return (
    <CenteredLayout>
      <Card title="Log In" maxWidth="20rem">
        <LoginForm />
      </Card>
    </CenteredLayout>
  );
}
