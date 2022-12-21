import React, { useState } from "react";
import { useUserAuth } from "./service/UserAuthContext";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";

function Signin() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      setError("Sign up complete please log in ");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Container>
      <Row>
        <Col>
          <div>
            <div className="p-4 box">
              <h2 className="mb-3"> Signup</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handelSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="Submit">
                    Sign up
                  </Button>
                </div>
              </Form>
            </div>
            <div className="p-4 box mt-3 text-center">
              Already have an account? <Link to="/">Log In</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Signin;
