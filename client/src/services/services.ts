import axios from "axios";

let baseURL: any;
if (process.env.NODE_ENV === "development") {
  baseURL = process.env.REACT_APP_API_DEV_URL;
} else {
  baseURL = process.env.REACT_APP_API_BASE_URL;
}

const _axios = axios.create({ baseURL });
export const _axiosAuth = axios.create({ baseURL });

// auth
export const login = (creds: any) =>
  _axios.post(`/api/auth/signin`, {
    username: creds.username,
    password: creds.password,
  });

export const register = (creds: any) =>
  _axios.post(`/api/auth/signup`, {
    username: creds.username,
    email: creds.email,
    password: creds.password,
  });
