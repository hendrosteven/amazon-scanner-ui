import { Button, Container, Table } from "react-bootstrap";
import Header from "../components/Header";
import { useFetcher, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DataService from "../services/DataService";
import { ThreeDots } from "react-loader-spinner";

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadingReview, setLoadingReview] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setLoading(true);
    DataService.productShowByASIN(id)
      .then((response) => {
        console.log("RESPONSE", response.data);
        setProduct(response.data);
        console.log("PRODUCT:", product);
        DataService.reviewsShowAll(id)
          .then((result) => {
            setReviews(result.data);
            console.log(result.data);
          })
          .catch((e) => {
            console.log(e);
          })
          .finally(() => {});
      })
      .catch((e) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <Header />
      <Container>
        <h4>Detail Product</h4>
        <Button>Refresh Product</Button>
        <p></p>
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
          <Table striped bordered>
            <thead>
              <tr>
                <td colSpan={2}>
                  <img src={product?.image} height={400} width={400} />
                </td>
              </tr>
            </thead>
            <tr>
              <td>
                <b>ASIN</b>
              </td>
              <td>{product?.asin}</td>
            </tr>
            <tr>
              <td>
                <b>Title</b>
              </td>
              <td>{product?.title}</td>
            </tr>
            <tr>
              <td>
                <b>Currency</b>
              </td>
              <td>{product?.currency}</td>
            </tr>
            <tr>
              <td>
                <b>Price</b>
              </td>
              <td>{product?.price}</td>
            </tr>
            <tr>
              <td>
                <b>Descriptions</b>
              </td>
              <td>{product?.descriptions}</td>
            </tr>
          </Table>
        )}
        <h4>Product Reviews</h4>
        <Table striped bordered>
          {reviews.map((rev) => {
            return (
              <tr key="rev.id">
                <td>
                  {rev.review_date}
                  <br />
                  {rev.name}
                  <br />
                  Rating: {rev.rating}
                </td>
                <td>{rev.review}</td>
              </tr>
            );
          })}
        </Table>
      </Container>
    </>
  );
};

export default DetailProduct;
