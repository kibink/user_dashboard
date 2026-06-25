import { useState } from "react";
import { Alert, Button, Form, Row } from "react-bootstrap";
import { useLogin } from "@/features/auth/hooks/login";
import { ApiError } from "@/types/errors";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ email, password });
  };

  const getError = () => {
      if (error) {
        if (error instanceof ApiError) {
          if (error.code === "VALIDATION_ERROR") {
            return error.details[0].message;
          }
        }
        return error.message;
      }
    };

  return (
    <Form onSubmit={handleSubmit}>
      {error && (
        <Alert variant="danger">
          {getError() || "Something went wrong"}
        </Alert>
      )}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Row className="justify-content-center">
        <Button style={{ width: "6rem" }} variant="primary" type="submit">
          {isPending ? "Loading..." : "Log In"}
        </Button>
      </Row>
    </Form>
  );
}
