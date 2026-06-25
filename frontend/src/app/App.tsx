import { Routes, Route, Navigate } from "react-router";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { GuestRoute } from "@/routes/GuestRoute";
import { BlockedRoute } from "@/routes/BlockedRoute";
import LoginPage from "@/features/auth/routes/LoginPage";
import RegisterPage from "@/features/auth/routes/RegisterPage";
import DashboardPage from "@/features/users/routes/DashboardPage";
import NotFoundPage from "@/routes/pages/NotFoundPage";
import Header from "@/components/Header";
import BlockedPage from "@/routes/pages/BlockedPage";
import VerificationCheckPage from "@/features/verification/routes/VerificationCheckPage";
import { Toast, ToastContainer } from "react-bootstrap";
import { useSendVerificationEmail } from "@/features/verification/hooks/send-verification-email";

function App() {
  const {
    mutate: sendEmail,
    isSuccess: isSendEmailSuccess,
    isError: isSendEmailError,
    error: sendEmailError,
    reset,
  } = useSendVerificationEmail();

  const showToast = isSendEmailSuccess || isSendEmailError;
  const toastType = isSendEmailSuccess ? "success" : "error";

  const handleSendEmail = () => {
    sendEmail();
  };

  const toastConfig = {
    success: {
      title: "Success",
      message: "Email was sent ✅",
    },
    error: {
      title: "Error",
      message: `Failed to send email: ${sendEmailError?.message || "Unexpected error"}`,
    },
  };

  const handleCloseToast = () => {
    reset();
  };

  const currentToast = toastConfig[toastType];

  return (
    <>
      <Header handleSendEmail={handleSendEmail} isSendEmailSuccess={isSendEmailSuccess} />
      <ToastContainer
        position="top-end"
        className="p-3"
        style={{ marginTop: "70px" }}
      >
        <Toast
          onClose={handleCloseToast}
          delay={toastType === "error" ? 5000 : 3000}
          autohide
          show={showToast}
        >
          <Toast.Header className="text-dark">
            <strong className="me-auto text-dark">{currentToast.title}</strong>
          </Toast.Header>
          <Toast.Body>{currentToast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
      <Routes>
        <Route element={<BlockedRoute />}>
          <Route path="/blocked" element={<BlockedPage />} />
        </Route>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/verify-email" element={<VerificationCheckPage />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
