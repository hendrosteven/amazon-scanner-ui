import axios from "axios";

export default axios.create({
  baseURL: "https://amazon-scanner-api-c57c2d29235e.herokuapp.com",
  headers: {
    "Content-type": "application/json",
  },
});
