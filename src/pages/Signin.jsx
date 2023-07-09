import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Header from "../components/Header";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import DataService from "../services/DataService";

const Signin = () => {
  const { userContext } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = userContext;
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    const data = {
      email: email,
      password: password,
    };
    setLoading(true);
    DataService.userSignin(data)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(response.data);
        navigate("/products", { replace: true });
      })
      .catch((e) => {
        setError(true);
        setMessage(e.response.data.message);
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
                  {error ? (
                    <h4 style={{ color: "red" }}>Invalid Email or Password!</h4>
                  ) : (
                    <></>
                  )}
                  <h2 className="fw-bold mb-2 text-uppercase ">
                    Amazon Scanner
                  </h2>
                  <p className=" mb-5">Please enter your email and password!</p>
                  <div className="mb-3">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="text-center">
                        Email address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    ></Form.Group>
                    <div className="d-grid">
                      {!loading ? (
                        <Button
                          variant="dark"
                          type="submit"
                          onClick={handleSignIn}
                        >
                          Sign In
                        </Button>
                      ) : (
                        <Button variant="dark" disabled>
                          Process..
                        </Button>
                      )}
                    </div>

                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don`t have an account?{" "}
                        <Link to="/signup" className="text-primary fw-bold">
                          Sign Up
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

export default Signin;
