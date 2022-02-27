import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import UserForm from "../components/UserForm";

const SIGNIN_USER = gql`
  mutation signIn($email: String!, $password: String!){
    signIn(email: $email, password: $password)
  }
`;

const SignIn = () => {
  useEffect(()=>{
   document.title = ' Sign In - Notedly'; 
  })
  
  const navigation = useNavigate();
  const client = useApolloClient();
  const [signIn, {loading, error}] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signIn);
      client.writeQuery({
        query: gql`
          query isLoggedIn {
            isLoggedIn
          }
        `,
        data: {
          isLoggedIn: true
        }
      })
      navigation('/');
    }
  })
  return (
    <>
      <UserForm action={signIn} formType='signIn'/>
      {loading && <p>Loading...</p>}
      {error && <p>Error signing in</p>}
    </>
  );
}

export default SignIn;