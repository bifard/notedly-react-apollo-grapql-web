import React, { useEffect } from "react";
import { gql, InMemoryCache, useApolloClient, useQuery } from "@apollo/client";
import { Navigate, Route, useNavigate } from "react-router";

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