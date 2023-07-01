import { useContext, useEffect, useState } from "react";
import styles from "../assets/css/pages/home.module.css";
import { ThemeContext } from "../context/ThemeContext";
import { Header } from "../components/Header";
import { VideoCard } from "../components/VideoCard";
import { ShortCard } from "../components/ShortCard";
import { getVideos } from "../services/services";

type homeProps = {
  type: string;
};
export const Home = ({ type }: homeProps) => {
  const { state } = useContext(ThemeContext);
  const theme = state.theme === "light" ? styles.light : styles.dark;
  const [videos, setVideos] = useState<any[]>([]);

  let tempVideos = [];
  if (videos.length === 1) {
    for (var i = 0; i < 10; i++) {
      tempVideos.push(videos[0]);
    }
  }

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const res = await getVideos(type);
        if (res.status === 200) {
          setVideos(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadVideos();
  }, [type]);

  console.log(videos);

  return (
    <div className={`${styles.container} ${theme}`}>
      <div className={styles.wrapper}>
        <Header />
        <div className={styles.videoWrapper}>
          {tempVideos.map((video, index) => (
            <VideoCard key={index} video={video} />
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
