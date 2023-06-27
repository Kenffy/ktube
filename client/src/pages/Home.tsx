import { useContext } from "react";
import styles from "../assets/css/pages/home.module.css";
import { ThemeContext } from "../context/ThemeContext";
import { Header } from "../components/Header";
import { VideoCard } from "../components/VideoCard";
import { ShortCard } from "../components/ShortCard";

export const Home = () => {
  const { state } = useContext(ThemeContext);
  const theme = state.theme === "light" ? styles.light : styles.dark;
  return (
    <div className={`${styles.container} ${theme}`}>
      <div className={styles.wrapper}>
        <Header />
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
