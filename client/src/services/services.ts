import axios from "axios";
import { LoginModel, RegisterModel, VideoModel } from "../types/types";

let baseURL: string | undefined;

if (process.env.NODE_ENV === "development") {
  baseURL = process.env.REACT_APP_API_DEV_URL;
} else {
  baseURL = process.env.REACT_APP_API_BASE_URL;
}

const _axios = axios.create({ baseURL });
const _axiosAuth = axios.create({ baseURL });

// auth
export const login = (creds: LoginModel) =>
  _axios.post(`/auth/login`, {
    username: creds.username,
    password: creds.password,
  });

export const register = (creds: RegisterModel) =>
  _axios.post(`/auth/register`, {
    username: creds.username,
    email: creds.email,
    password: creds.password,
  });

export const logout = (refreshToken: string | undefined) =>
  _axios.post(baseURL + "/auth/logout", { token: refreshToken });

export const refreshToken = (token: string) =>
  _axios.post(baseURL + "/auth/refresh", { token });

// users
export const getUser = (id: string, token: string) =>
  _axiosAuth.get(`/users/find/${id}`, {
    headers: { authorization: "Bearer " + token },
  });

// videos
export const createVideo = (video: VideoModel, token: string | undefined) =>
  _axiosAuth.post(`/videos`, video, {
    headers: { authorization: "Bearer " + token },
  });
export const updateVideo = (video: VideoModel, token: string) =>
  _axiosAuth.put(`/videos/${video?._id}`, video, {
    headers: { authorization: "Bearer " + token },
  });
export const deleteVideo = (id: string, token: string) =>
  _axiosAuth.delete(`/videos/${id}`, {
    headers: { authorization: "Bearer " + token },
  });

export const getVideos = (type: string) => _axios.get(`/videos/${type}`);
export const getShorts = () => _axios.get(`/videos/shorts/random`);
export const getVideo = (id: string | undefined) =>
  _axios.get(`/videos/find/${id}`);
