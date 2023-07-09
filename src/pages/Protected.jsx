import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

// eslint-disable-next-line react/prop-types
const Protected = ({ children }) => {
  const { userContext } = useContext(AppContext);
  const [user] = userContext;

  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default Protected;
