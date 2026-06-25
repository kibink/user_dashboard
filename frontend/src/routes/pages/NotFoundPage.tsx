import CenteredLayout from "@/components/CenteredLayout";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <CenteredLayout>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Button className="mt-4" onClick={handleClick}>Home</Button>
    </CenteredLayout>
  );
}
