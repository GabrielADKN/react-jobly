import React, { useState, useEffect } from "react";
import AppRoutes from "../routes/AppRoutes";
import Navbar from "../routes/Navbar";
import UserContext from "../auth/UserContext";
import JoblyApi from "../api/api";
import { jwtDecode } from "jwt-decode";
import { BrowserRouter } from "react-router-dom";

const ContextHolder = () => {
  const LOCAL_STORAGE_KEY = "token";

  const [currentUser, setCurrentUser] = useState("");

  const [token, setToken] = useState(() => {
    try {
      const value = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (value == null) return null;
      return JSON.parse(value);
    } catch (error) {
      console.log("error retrieving token:", error);
    }
  });

  useEffect(() => {
    const updateToken = async () => {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(token));

        if (!token) {
          return;
        }
        JoblyApi.token = token;
        let decodedToken = jwtDecode(token);
        setCurrentUser(await JoblyApi.getProfile(decodedToken.username));
      } catch (error) {
        console.log("error in updateToken", error);
      }
    };
    updateToken();
  }, [token]);

  async function signupFormSubmit(formData) {
    let res = await JoblyApi.registerUser({ ...formData });
    setToken(res);
    currentUser.token = token;
  }

  async function loginFormSubmit(formData) {
    try {
      let res = await JoblyApi.loginUser({ ...formData });
      setToken(res);
      JoblyApi.token = res;
    } catch (error) {
      console.log("login error:", error);
    }
  }

  const context = {
    signupFormSubmit,
    currentUser,
    setCurrentUser,
    loginFormSubmit,
    token,
    setToken,
    LOCAL_STORAGE_KEY,
  };

  return (
    <UserContext.Provider value={context}>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default ContextHolder;
