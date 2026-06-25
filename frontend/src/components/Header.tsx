import { useLogout } from "@/features/auth/hooks/logout";
import { useMe } from "@/features/users/hooks/me";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Header({ handleSendEmail, isSendEmailSuccess }) {
  const { data, isLoading } = useMe();
  const { mutate: logout, isPending } = useLogout();
  const navigate = useNavigate();

  if (isPending || isLoading) {
    return null;
  }

  return (
    <Navbar className="bg-primary navbar-dark position-absolute w-100">
      <Container>
        <Navbar.Brand onClick={() => navigate("/dashboard")}>
          User Dashboard
        </Navbar.Brand>
        <Navbar.Collapse>
          {data ? (
            <Nav className="ms-auto">
              <Navbar.Text className="p-2">
                Welcome, <b>{data.name}</b>!
              </Navbar.Text>
              {!data.isVerified && !data.isBlocked ? (
                <>
                  <Navbar.Text className="p-2 user-select-none">|</Navbar.Text>
                  <Nav.Link
                    onClick={handleSendEmail}
                    disabled={isSendEmailSuccess}
                  >
                    {isSendEmailSuccess ? "Email sent ✓" : "Verify email"}
                  </Nav.Link>
                </>
              ) : null}
              <Navbar.Text className="p-2 user-select-none">|</Navbar.Text>
              <Nav.Link onClick={() => logout()}>Log Out</Nav.Link>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link onClick={() => navigate("/login")}>Log In</Nav.Link>
              <Nav.Link onClick={() => navigate("/register")}>Sign Up</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
