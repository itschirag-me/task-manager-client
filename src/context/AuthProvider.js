import { isEmpty } from "lodash";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useLocalStorage from "../hooks/useLocalStorage";
import { AuthLoginService, setAuthHeader } from "../services/Auth/AuthService";
import { UserProfileService } from "../services/Auth/UserService";
import { userProfileData } from "../utils/constant";

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [token] = useLocalStorage("authToken", null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(userProfileData);
  const [apiLoader, setApiLoader] = useState(true);

  const handleLogout = async () => {
    localStorage.clear();
    setAuthHeader();
    setUserProfile({});
    setIsLoggedIn(false);
    toast.error("Logged out successfully");
  };

  useEffect(() => {
    (async () => {
      if (token) {
        setAuthHeader();
        try {
          const userData = await UserProfileService();
          if (!userData.isSuccess) {
            localStorage.clear();
            setAuthHeader();
            setUserProfile({});
            setIsLoggedIn(false);
            setTimeout(() => setApiLoader(false), 1000);
          } else {
            setUserProfile(userData?.data);
            setIsLoggedIn(true);
            setTimeout(() => setApiLoader(false), 1000);
          }
        } catch (error) {
          localStorage.clear();
          setAuthHeader();
          setUserProfile({});
          setIsLoggedIn();
          setTimeout(() => setApiLoader(false), 1000);
        }
      } else {
        localStorage.clear();
        setAuthHeader();
        setUserProfile({});
        setIsLoggedIn(false);
        setTimeout(() => setApiLoader(false), 1000);
      }
    })();
  }, [token]);

  const authContextValue = {
    token,
    isLoggedIn,
    apiLoader,
    setApiLoader,
    setIsLoggedIn,
    handleLogout,
    userProfile,
    setUserProfile,
  };

  return <AuthContext.Provider value={authContextValue} {...props} />;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
