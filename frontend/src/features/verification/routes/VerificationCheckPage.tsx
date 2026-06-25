import CenteredLayout from "@/components/CenteredLayout";
import { Button } from "react-bootstrap";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router";
import { useVerifyUser } from "@/features/verification/hooks/verify-user";
import LoadingPage from "@/routes/pages/LoadingPage";
import { useEffect } from "react";
import { ApiError } from "@/types/errors";

export default function VerificationCheckPage() {
  const { mutate, isPending, error } = useVerifyUser();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const verificationCode = searchParams.get("verificationCode");

  useEffect(() => {
    if (verificationCode) {
      mutate(verificationCode);
    }
  }, [verificationCode, mutate]);

  const handleClick = () => {
    navigate("/dashboard");
  };

  if (isPending) {
    return <LoadingPage />;
  }

  if (error) {
    if (error instanceof ApiError) {
      if (error.code == "USER_ALREADY_VERIFIED") {
        return (
          <CenteredLayout>
            <h1>
              <FaCheck />
            </h1>
            <h2>Your account has already been verified.</h2>
            <Button className="mt-4" onClick={handleClick}>
              Home
            </Button>
          </CenteredLayout>
        );
      }
    }
    return (
      <CenteredLayout>
        <h1>
          <FaXmark />
        </h1>
        <h2>Your account has not been verified.</h2>
        <Button className="mt-4" onClick={handleClick}>
          Home
        </Button>
      </CenteredLayout>
    );
  }

  return (
    <CenteredLayout>
      <h1>
        <FaCheck />
      </h1>
      <h2>Your account has been verified!</h2>
      <Button className="mt-4" onClick={handleClick}>
        Okay!
      </Button>
    </CenteredLayout>
  );
}
