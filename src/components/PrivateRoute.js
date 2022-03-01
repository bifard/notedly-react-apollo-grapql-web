import React from "react";
import { useApolloClient } from "@apollo/client";
import { Navigate } from "react-router";
import { IS_LOGGED_IN } from "../gql/query";



const PrivateRoute = ({children}) => {
  const client = useApolloClient();
  const {isLoggedIn} = client.readQuery({query:IS_LOGGED_IN});
  return isLoggedIn ? children : <Navigate to='/signin'/>;
}

export default PrivateRoute;