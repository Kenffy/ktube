// interfaces

import { Reducer } from "@reduxjs/toolkit";

export interface VideoProps {
  id: number;
  title: string;
  url: string;
}

export interface LoginModel {
  username: string;
  password: string;
}

export interface RegisterModel {
  email: string;
  username: string;
  password: string;
}

export interface IAuthUser {
  id: string;
  isAdmin: boolean;
  username: string;
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  profile: string;
  cover: string;
  subscribers: string[];
  subscriptions: string[];
  fromGoogle: boolean;
  isAdmin: boolean;
  createdAt: Date;
}

export interface IVideo {
  _id: string;
  title: string;
  desc: string;
  views: number;
  imgUrl: string;
  videoUrl: string;
  isShort: boolean;
  tags: string[];
  likes: string[];
  dislikes: string[];
  comments: string[];
  createdAt: Date;
}

export interface VideoModel {
  _id?: string;
  title: string;
  desc: string;
  views?: number;
  imgUrl: string;
  videoUrl: string;
  isShort: boolean;
  tags?: string[];
  likes?: string[];
  dislikes?: string[];
  comments?: string[];
  createdAt?: Date;
}

// types

export type ScrollOption = {
  root: any;
  rootMargin: string;
  threshold: number;
};

export type ShortProps = {
  video: VideoProps;
};

// user reducer
export type UserSliceProps = {
  authUser: IAuthUser | null;
  currentUser: IUser | null;
  loading: boolean;
  error: boolean;
};

// video reducer
export type VideoSliceProps = {
  videos: IVideo[];
  currentVideo: IVideo | null;
  loading: boolean;
  error: boolean;
};

export type StateProps = {
  user: UserSliceProps;
  video: VideoSliceProps;
};
