import { useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import UserForm from "../components/UserForm";
import { SIGNIN_USER } from "../gql/mutation";
import { IS_LOGGED_IN } from "../gql/query";


const SignIn = () => {
  
  useEffect(()=>{
   document.title = ' Sign In - Notedly'; 
  })

  const navigation = useNavigate();
  const client = useApolloClient();
  const {isLoggedIn} = client.readQuery({query:IS_LOGGED_IN});

  
  const [signIn, {loading, error}] = useMutation(SIGNIN_USER, {
    onCompleted: data => {
      localStorage.setItem('token', data.signIn);
      client.writeQuery({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: true
        }
      })
      navigation('/');
    }
  })
  return (
    <>
      {isLoggedIn && <Navigate to='/' />}
      <UserForm action={signIn} formType='signIn'/>
      {loading && <p>Loading...</p>}
      {error && <p>Error signing in</p>}
    </>
  );
}

export default SignIn;