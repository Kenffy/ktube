import { useContext, useEffect, useState } from "react";
import styles from "../assets/css/pages/home.module.css";
import { ThemeContext } from "../context/ThemeContext";
import { Header } from "../components/Header";
import { VideoCard } from "../components/VideoCard";
import { ShortCard } from "../components/ShortCard";
import { getVideos } from "../services/services";
import { IVideo } from "../types/types";
import { useDispatch } from "react-redux";
import {
  fetchAllVideoSuccess,
  fetchFailure,
  fetchStart,
} from "../redux/videoSlice";

type homeProps = {
  type: string;
};
export const Home = ({ type }: homeProps) => {
  const dispatch = useDispatch();
  const { state } = useContext(ThemeContext);
  const theme = state.theme === "light" ? styles.light : styles.dark;
  const [videos, setVideos] = useState<IVideo[]>([]);

  useEffect(() => {
    const loadVideos = async () => {
      dispatch(fetchStart());
      try {
        const res = await getVideos(type);
        if (res.status === 200) {
          setVideos(res.data);
          dispatch(fetchAllVideoSuccess(res.data));
        }
      } catch (error) {
        console.log(error);
        dispatch(fetchFailure());
      }
    };

    loadVideos();
  }, [type, dispatch]);

  return (
    <div className={`${styles.container} ${theme}`}>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.videoWrapper}>
          {videos.map((video) => (
            <VideoCard key={video?._id} video={video} />
          ))}
        </div>
        <hr />
        <div className={styles.shortWrapper}>
          <ShortCard />
          <ShortCard />
          <ShortCard />
          <ShortCard />
          <ShortCard />
          <ShortCard />
          <ShortCard />
          <ShortCard />
          <ShortCard />
          <ShortCard />
        </div>
        <hr />
        <div className={styles.videoWrapper}>
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
          <VideoCard />
        </div>
      </div>
    </div>
  );
};
