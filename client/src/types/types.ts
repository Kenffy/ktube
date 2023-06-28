export type ScrollOption = {
  root: any;
  rootMargin: string;
  threshold: number;
};

export interface VideoProps {
  id: number;
  title: string;
  url: string;
}

export type ShortProps = {
  video: VideoProps;
};
