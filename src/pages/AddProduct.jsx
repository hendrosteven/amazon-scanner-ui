import { Alert, Button, Container, Form } from "react-bootstrap";
import Header from "../components/Header";
import { useState } from "react";
import DataService from "../services/DataService";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [asin, setAsin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  const handleSearchDownload = () => {
    var data = {
      asin: asin,
    };
    setLoading(true);
    setError(false);
    setDone(false);
    DataService.productDownload(data)
      .then((response) => {
        console.log(response.data);
        setAsin("");
      })
      .catch((e) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        setDone(true);
      });
  };
  return (
    <>
      <Header />
      <Container>
        <h4>Download Product From Amazon</h4>
        {done ? (
          <Alert variant="success">
            Product downloaded! check <Link to={"/products"}>product list</Link>
          </Alert>
        ) : (
          <></>
        )}
        {error ? (
          <Alert variant="danger">
            Something went wrong or product not found!
          </Alert>
        ) : (
          <></>
        )}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Please enter ASIN</Form.Label>
          <Form.Control
            type="text"
            placeholder="B00083D754"
            value={asin}
            onChange={(e) => setAsin(e.target.value)}
          />
        </Form.Group>
        {!loading ? (
          <Button variant="dark" onClick={handleSearchDownload}>
            Search and Download
          </Button>
        ) : (
          <Button variant="dark" disabled>
            Process..
          </Button>
        )}
      </Container>
    </>
  );
};

export default AddProduct;
