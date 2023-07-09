import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useState } from "react";
import DataService from "../services/DataService";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSignup = () => {
    var data = {
      fullName: fullName,
      email: email,
      password: password,
    };
    setLoading(true);
    setError(false);
    setSubmitted(false);
    DataService.userSignup(data)
      .then((response) => {
        console.log(response);
        setSubmitted(true);
        setEmail("");
        setPassword("");
        setFullName("");
      })
      .catch((e) => {
        setError(true);
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Header />
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-dark"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  {submitted ? (
                    <h4 style={{ color: "green" }}>Registered successfully!</h4>
                  ) : (
                    <></>
                  )}
                  {error ? (
                    <h4 style={{ color: "red" }}>Something went wrong!</h4>
                  ) : (
                    <></>
                  )}
                  <h2 className="fw-bold mb-2 text-uppercase ">
                    Amazon Scanner
                  </h2>
                  <p className=" mb-5">Sign Up new account!</p>
                  <div className="mb-3">
                    <Form.Group className="mb-3">
                      <Form.Label className="text-center">Full name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter full name"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="text-center">
                        Email address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3"></Form.Group>
                    <div className="d-grid">
                      {!loading ? (
                        <Button
                          variant="dark"
                          type="submit"
                          onClick={handleSignup}
                        >
                          Sign Up
                        </Button>
                      ) : (
                        <Button variant="dark" disabled>
                          Process..
                        </Button>
                      )}
                    </div>

                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Already have an account?{" "}
                        <Link to="/signin" className="text-primary fw-bold">
                          Sign In
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signup;
