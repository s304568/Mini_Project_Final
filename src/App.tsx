import "./App.css";
import { useState, useEffect } from "react";
import NavBar from "./Components/Navbar/NavBar";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/Pages/Signup";
import LogIn from "./Components/Pages/LogIn";
import Home from "./Components/Pages/Home";
import NotFound from "./Components/Pages/NotFound";

import {
  INDEX_PATH,
  SIGNUP_PATH,
  LOGIN_PATH,
  NOTFOUND_PATH,
} from "./Components/Constants/paths";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path={INDEX_PATH} element={<Home />} />
          <Route path={SIGNUP_PATH} element={<SignUp />} />
          <Route path={LOGIN_PATH} element={<LogIn />} />
          <Route path={NOTFOUND_PATH} element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
