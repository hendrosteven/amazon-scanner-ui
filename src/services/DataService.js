import http from "./http-common";

const userSignup = (data) => {
  return http.post("/users/signup", data);
};

const userSignin = (data) => {
  return http.post("/users/signin", data);
};

const productDownload = (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return http.post("/products/download", data, {
    headers: {
      Authorization: `JWT ${user.accessToken}`,
    },
  });
};

const productSearch = (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return http.post("/products/search", data, {
    headers: {
      Authorization: `JWT ${user.accessToken}`,
    },
  });
};

const productShowAll = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return http.get("/products", {
    headers: {
      Authorization: `JWT ${user.accessToken}`,
    },
  });
};

const productShowByASIN = (asin) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return http.get(`/products/${asin}`, {
    headers: {
      Authorization: `JWT ${user.accessToken}`,
    },
  });
};

const reviewsDownload = (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return http.post("/reviews/download", data, {
    headers: {
      Authorization: `JWT ${user.accessToken}`,
    },
  });
};

const reviewsSearch = (asin, data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return http.post(`/reviews/search/${asin}`, data, {
    headers: {
      Authorization: `JWT ${user.accessToken}`,
    },
  });
};

const reviewsShowAll = (asin) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return http.get(`/reviews/${asin}`, {
    headers: {
      Authorization: `JWT ${user.accessToken}`,
    },
  });
};

const DataService = {
  reviewsShowAll,
  reviewsSearch,
  reviewsDownload,
  productShowAll,
  productShowByASIN,
  productSearch,
  productDownload,
  userSignup,
  userSignin,
};

export default DataService;
