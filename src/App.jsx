import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListProduct from "./pages/ListProduct";
import AddProduct from "./pages/AddProduct";
import DetailProduct from "./pages/DetailProduct";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Protected from "./pages/Protected";
import { useEffect, useState } from "react";
import { AppContext } from "./context/AppContext";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data) {
      setUser(data);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        userContext: [user, setUser],
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <ListProduct />
              </Protected>
            }
          />
          <Route
            path="/products"
            element={
              <Protected>
                <ListProduct />
              </Protected>
            }
          />
          <Route
            path="/add"
            element={
              <Protected>
                <AddProduct />
              </Protected>
            }
          />
          <Route path="/products/:id" element={<DetailProduct />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;
