// interfaces

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

// types

export type ScrollOption = {
  root: any;
  rootMargin: string;
  threshold: number;
};

export type ShortProps = {
  video: VideoProps;
};
