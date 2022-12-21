import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "./UserAuthContext";
import { Container, Row, Col } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { Login, googlesignin } = useUserAuth();
  const navigate = useNavigate();
  const handelGoogleSignin = async (e) => {
    e.preventDefault();
    try {
      await googlesignin();
      navigate("/App");
    } catch (error) {
      setError(error.message);
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      await Login(email, password);
      navigate("/App");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="container">
              <div className="p-4 box">
                <h2 className="mb-3">Welcome Please Login</h2>
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
                      Log In
                    </Button>
                  </div>
                </Form>
                <hr />
                <div>
                  <GoogleButton
                    className="g-btn"
                    type="dark"
                    onClick={handelGoogleSignin}
                  />
                </div>
              </div>
              <div className="p-4 box mt-3 text-center">
                Don't have an account? <Link to="/signup">Sign up</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
