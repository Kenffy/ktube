import axios from "axios";
import { LoginModel, RegisterModel } from "../types/types";

let baseURL: any;
if (process.env.NODE_ENV === "development") {
  baseURL = process.env.REACT_APP_API_DEV_URL;
} else {
  baseURL = process.env.REACT_APP_API_BASE_URL;
}

const _axios = axios.create({ baseURL });
export const _axiosAuth = axios.create({ baseURL });

// auth
export const login = (creds: LoginModel) =>
  _axios.post(`/api/auth/signin`, {
    username: creds.username,
    password: creds.password,
  });

export const register = (creds: RegisterModel) =>
  _axios.post(`/api/auth/signup`, {
    username: creds.username,
    email: creds.email,
    password: creds.password,
  });

// videos
export const createVideo = (video: any, token: string) =>
  _axiosAuth.post(`/api/videos`, video, {
    headers: { authorization: "Bearer " + token },
  });
export const updateVideo = (video: any, token: string) =>
  _axiosAuth.put(`/api/videos/${video?._id}`, video, {
    headers: { authorization: "Bearer " + token },
  });
export const deleteVideo = (id: string, token: string) =>
  _axiosAuth.delete(`/api/videos/${id}`, {
    headers: { authorization: "Bearer " + token },
  });

export const getVideos = (url: string) => _axios.get(url);
export const getVideo = (id: string | undefined) =>
  _axios.get(`/api/videos/find/${id}`);
