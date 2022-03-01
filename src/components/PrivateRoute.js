import React from "react";
import { gql, useApolloClient } from "@apollo/client";
import { Navigate } from "react-router";

const IS_LOGGED_IN = gql`
  query  {
    isLoggedIn
  }
`;


const PrivateRoute = ({children}) => {
  const client = useApolloClient();
  const {isLoggedIn} = client.readQuery({query:IS_LOGGED_IN});
  return isLoggedIn ? children : <Navigate to='/signin'/>;
}

export default PrivateRoute;