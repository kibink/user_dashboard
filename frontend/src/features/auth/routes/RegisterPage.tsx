import CenteredLayout from "@/components/CenteredLayout";
import RegisterForm from "@/features/auth/components/RegisterForm";
import Card from "@/components/Card";

export default function RegisterPage() {
  return (
    <CenteredLayout>
      <Card title="Sign Up" maxWidth="20rem">
        <RegisterForm />
      </Card>
    </CenteredLayout>
  );
}
