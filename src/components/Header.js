import React from "react";
import styled from "styled-components";

import {ReactComponent as Logo} from '../img/logo.svg';
import { useApolloClient } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import ButtonAsLink from "./ButtonAsLink";
import { IS_LOGGED_IN } from "../gql/query";


const UserState = styled.div`
  margin-left: auto;
`;
const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-item: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0 , 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;


const Header = () => {
  const navigation = useNavigate();
  const client = useApolloClient()
  const { isLoggedIn } = client.readQuery({query: IS_LOGGED_IN});
  return(
    <HeaderBar>
      <Logo/>
      <LogoText>Notedly</LogoText>
      <UserState>
        {
          isLoggedIn ? (
            <ButtonAsLink
              onClick={()=> {
                localStorage.removeItem('token');
                client.resetStore();
                client.writeQuery({
                  query: IS_LOGGED_IN,
                  data: {
                    isLoggedIn: false
                  }
                })                 
             
              navigation("./");
            }}
            >
              Logout
            </ButtonAsLink>
          ): (
            <p>
              <Link to={'/signin'}> Sign In</Link> or {' '}
              <Link to={'/signup'}> Sign Up</Link>
            </p>
          )
        }
      </UserState>
    </HeaderBar>
  );
}

export default Header;