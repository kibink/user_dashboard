import CenteredLayout from "@/components/CenteredLayout";
import { Spinner } from "react-bootstrap";

export default function LoadingPage() {
  return (
    <CenteredLayout>
      <Spinner variant="dark"></Spinner>
    </CenteredLayout>
  );
}
