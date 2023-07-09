import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import DataService from "../services/DataService";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

// eslint-disable-next-line react/prop-types
const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [keywords, setKeywords] = useState("");

  useEffect(() => {
    setLoading(true);
    DataService.productShowAll()
      .then((response) => {
        console.log("RESPONSE", response.data);
        setProducts(response.data);
        console.log("PRODUCTS:", products);
      })
      .catch((e) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const searchProduct = () => {
    setLoading(true);
    DataService.productSearch({ keywords: keywords })
      .then((response) => {
        setProducts(
          response.data.map((data) => {
            return data.item;
          })
        );
      })
      .catch((e) => {
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
        <h4>Downloaded Product From Amazon</h4>
        <Row className="align-items-center">
          <Col xl="auto">
            <Form.Label visuallyHidden>Name</Form.Label>
            <Form.Control
              className="mb-2"
              id="inlineFormInput"
              placeholder="Search Product"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button className="mb-2" onClick={searchProduct}>
              Search
            </Button>
          </Col>
        </Row>
        {error ? <Alert variant="danger">Something went wrong!</Alert> : <></>}
        {products?.length <= 0 ? (
          <Alert variant="warning">
            No product yet! Please <Link to={"/add"}>Add Product</Link> first
          </Alert>
        ) : (
          <></>
        )}
        {loading ? (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="grey"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ASIN</th>
                <th>Title</th>
                <th>Currency</th>
                <th>Price</th>
                <th></th>
              </tr>
              {products.map((product) => {
                return (
                  <tr key={product.asin}>
                    <td>{product.asin}</td>
                    <td>{product.title}</td>
                    <td>{product.currency}</td>
                    <td>{product.price}</td>
                    <td>
                      <Link to={`/products/${product.asin}`}>
                        <Button>Show</Button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </thead>
          </Table>
        )}
      </Container>
    </>
  );
};

export default ListProduct;
