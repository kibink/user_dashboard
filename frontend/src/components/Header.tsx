import type { MouseEventHandler } from "react";
import { useLogout } from "@/features/auth/hooks/logout";
import { useMe } from "@/features/users/hooks/me";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";

interface HeaderProps {
  handleSendEmail: MouseEventHandler<HTMLAnchorElement>;
  isSendEmailSuccess: boolean;
}

export default function Header({
  handleSendEmail,
  isSendEmailSuccess,
}: HeaderProps) {
  const { data, isLoading } = useMe();
  const { mutate: logout, isPending } = useLogout();
  const navigate = useNavigate();

  if (isPending || isLoading) {
    return null;
  }

  return (
    <Navbar
  expand="md"
  className="bg-primary navbar-dark position-absolute w-100 z-3"
>
  <Container>
    <Navbar.Brand onClick={() => navigate("/dashboard")}>
      User Dashboard
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="main-navbar" />

    <Navbar.Collapse id="main-navbar">
      {data ? (
        <Nav className="ms-auto">
          <Navbar.Text className="p-2">
            Welcome, <b>{data.name}</b>!
          </Navbar.Text>

          {!data.isVerified && !data.isBlocked && (
            <Nav.Link
              onClick={handleSendEmail}
              disabled={isSendEmailSuccess}
            >
              {isSendEmailSuccess ? "Email sent ✓" : "Verify email"}
            </Nav.Link>
          )}

          <Nav.Link onClick={() => logout()}>
            Log Out
          </Nav.Link>
        </Nav>
      ) : (
        <Nav className="ms-auto">
          <Nav.Link onClick={() => navigate("/login")}>
            Log In
          </Nav.Link>
          <Nav.Link onClick={() => navigate("/register")}>
            Sign Up
          </Nav.Link>
        </Nav>
      )}
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
}
