import axios from "axios";
import { apiProvider } from "../provider";
import { UserProfileService } from "./UserService";

export const setAuthHeader = (token) => {
  if (!token) {
    token = JSON.parse(localStorage.getItem("authToken"));
  }
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const AuthLoginService = async (payload) => {
  const { data } = await apiProvider.post("/auth/login", payload);
  return data;
};

export const AuthSignUpService = async (payload) => {
  const { data } = await apiProvider.post("/auth/signup", payload);
  return data;
};

export const AuthCheckEmail = async (payload) => {
  const { data } = await apiProvider.post("/auth/validate/email", payload);
  return data;
};
