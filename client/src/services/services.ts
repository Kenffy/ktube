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
export const getUser = (id: string | undefined) =>
  _axios.get(`/users/find/${id}`);

export const subscribe = (channelId: string, token: string | undefined) =>
  _axiosAuth.put(
    `/users/subscribe/${channelId}`,
    { channelId },
    {
      headers: { authorization: "Bearer " + token },
    }
  );

export const unsubscribe = (channelId: string, token: string | undefined) =>
  _axiosAuth.put(
    `/users/unsubscribe/${channelId}`,
    { channelId },
    {
      headers: { authorization: "Bearer " + token },
    }
  );

// videos
export const createVideo = (video: VideoModel, token: string | undefined) =>
  _axiosAuth.post(`/videos`, video, {
    headers: { authorization: "Bearer " + token },
  });
export const updateVideo = (video: VideoModel, token: string | undefined) =>
  _axiosAuth.put(`/videos/${video?._id}`, video, {
    headers: { authorization: "Bearer " + token },
  });

export const likeVideo = (videoId: string, token: string | undefined) =>
  _axiosAuth.put(
    `/videos/like/${videoId}`,
    { videoId },
    {
      headers: { authorization: "Bearer " + token },
    }
  );

export const dislikeVideo = (videoId: string, token: string | undefined) =>
  _axiosAuth.put(
    `/videos/dislike/${videoId}`,
    { videoId },
    {
      headers: { authorization: "Bearer " + token },
    }
  );

export const deleteVideo = (id: string, token: string) =>
  _axiosAuth.delete(`/videos/${id}`, {
    headers: { authorization: "Bearer " + token },
  });

export const getVideos = (type: string, token: string | undefined) =>
  _axios.get(`/videos/${type}`, {
    headers: { authorization: "Bearer " + token },
  });

export const getRandomShorts = () => _axios.get(`/videos/random/shorts`);
export const getRandomVideos = () => _axios.get(`/videos/random`);

export const getVideosByUserId = (userId: string | undefined) =>
  _axios.get(`/videos/${userId}`);
export const getShortsByUserId = (userId: string | undefined) =>
  _axios.get(`/videos/shorts/${userId}`);
export const getVideo = (id: string | undefined) =>
  _axios.get(`/videos/find/${id}`);

// Comments
export const createComment = (comment: any, token: string | undefined) =>
  _axiosAuth.post(`/comments`, comment, {
    headers: { authorization: "Bearer " + token },
  });

export const deleteComment = (id: string, token: string | undefined) =>
  _axiosAuth.delete(`/comments/${id}`, {
    headers: { authorization: "Bearer " + token },
  });

export const getCommentByVideoId = (id: string) =>
  _axios.get(`/comments/${id}`);

export const likeComment = (commentId: string, token: string | undefined) =>
  _axiosAuth.put(
    `/comments/like/${commentId}`,
    { commentId },
    {
      headers: { authorization: "Bearer " + token },
    }
  );

export const dislikeComment = (commentId: string, token: string | undefined) =>
  _axiosAuth.put(
    `/comments/dislike/${commentId}`,
    { commentId },
    {
      headers: { authorization: "Bearer " + token },
    }
  );
