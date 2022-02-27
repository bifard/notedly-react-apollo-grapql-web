import React from "react";
import { Routes, Route} from 'react-router-dom';

import Layout from "../components/Layout";
import Favorites from "./favorites";
import Home from "./home";
import MyNotes from "./mynotes";
import NotePage from "./notes";
import SignIn from "./signin";
import SignUp from "./signup";

const Pages = () => {
  return(
        <Layout>
          <Routes>
            <Route exact path="/" element = {<Home/>}/>
            <Route path="/mynotes" element = {<MyNotes/>}/>
            <Route path="/favorites" element = {<Favorites/>}/>
            <Route path="/note/:id" element = {<NotePage/>}/>
            <Route path="/signup" element = {<SignUp/>}/>
            <Route path="/signin" element = {<SignIn/>}/>
          </Routes>
        </Layout>
  );
}

export default Pages;
