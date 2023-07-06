import { useContext, useEffect, useState } from "react";
import styles from "../assets/css/pages/home.module.css";
import { ThemeContext } from "../context/ThemeContext";
import { Header } from "../components/Header";
import { VideoCard } from "../components/VideoCard";
import { ShortCard } from "../components/ShortCard";
import { getShorts, getVideos } from "../services/services";
import { IVideo } from "../types/types";
import { useDispatch } from "react-redux";
import {
  fetchAllShortsSuccess,
  fetchAllVideoSuccess,
} from "../redux/videoSlice";

type homeProps = {
  type: string;
};
export const Home = ({ type }: homeProps) => {
  const dispatch = useDispatch();
  const { state } = useContext(ThemeContext);
  const theme = state.theme === "light" ? styles.light : styles.dark;
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [shorts, setShorts] = useState<IVideo[]>([]);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const videoRes = await getVideos(type);
        const shortRes = await getShorts();
        if (videoRes.status === 200) {
          setVideos(videoRes.data);
          dispatch(fetchAllVideoSuccess(videoRes.data));
        }
        if (shortRes.status === 200) {
          setShorts(shortRes.data);
          dispatch(fetchAllShortsSuccess(shortRes.data));
        }
      } catch (error) {
        console.log(error);
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
          {shorts.map((video) => (
            <ShortCard key={video?._id} video={video} />
          ))}
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
