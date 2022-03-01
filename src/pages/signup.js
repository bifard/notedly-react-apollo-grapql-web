import { useMutation, useApolloClient } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { SIGNUP_USER } from "../gql/mutation";
import { IS_LOGGED_IN } from "../gql/query";

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
        query: IS_LOGGED_IN,
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
      {loading && <p>Loading...</p>}
      {error && <p>Error signing in</p>}
    </>
  );
}

export default SignUp;