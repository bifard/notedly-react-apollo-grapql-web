import { useMutation, gql, useApolloClient } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import UserForm from "../components/UserForm";


const SIGNUP_USER = gql`
  mutation SignUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;




const SignUp = () => {
  const navigation = useNavigate();
  const client = useApolloClient();

  
  useEffect(()=>{
    document.title = 'Sign Up - Notedly';
  });

  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signUp);
      client.writeQuery({
        query: gql`
          query isLoggedIn{
            isLoggedIn
          }
        `,
        data: {
          isLoggedIn: true
        }
      });
      navigation('/');
    }
  })
  
  return (
    <>
      <UserForm action={signUp} formType='signup'/>
    </>
  );
}

export default SignUp;