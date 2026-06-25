import CenteredLayout from "@/components/CenteredLayout";
import { useLogout } from "@/features/auth/hooks/logout";
import { Button } from "react-bootstrap";
import { FaLock } from "react-icons/fa6";
import LoadingPage from "@/routes/pages/LoadingPage";

export default function NotFoundPage() {
  const { mutate, isPending } = useLogout();

  const handleClick = () => {
    mutate();
  };

  if (isPending) {
    return <LoadingPage />;
  }

  return (
    <CenteredLayout>
      <h1>
        <FaLock />
      </h1>
      <h2>You were blocked</h2>
      <Button className="mt-4" onClick={handleClick}>
        Log Out
      </Button>
    </CenteredLayout>
  );
}
