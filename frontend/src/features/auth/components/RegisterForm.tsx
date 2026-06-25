import { useState } from "react";
import { Alert, Button, Form, Row } from "react-bootstrap";
import { useRegister } from "@/features/auth/hooks/register";
import { ApiError } from "@/types/errors";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, error } = useRegister();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ name, email, password });
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
        <Alert variant="danger">{getError() || "Something went wrong"}</Alert>
      )}
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="name"
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Row className="justify-content-center">
        <Button style={{ width: "6rem" }} variant="primary" type="submit">
          {isPending ? "Loading..." : "Sign Up"}
        </Button>
      </Row>
    </Form>
  );
}
