import { useContext, useEffect, useState } from "react";
import styles from "../assets/css/pages/home.module.css";
import { ThemeContext } from "../context/ThemeContext";
import { Header } from "../components/Header";
import { VideoCard } from "../components/VideoCard";
import { ShortCard } from "../components/ShortCard";
import { getVideos } from "../services/services";
import { StateProps } from "../types/types";
import { useSelector } from "react-redux";
import { VideoSKCard } from "../components/VideoSKCard";
import { ShortSKCard } from "../components/ShortSKCard";

type homeProps = {
  type: string;
};
export const Home = ({ type }: homeProps) => {
  const { state } = useContext(ThemeContext);
  const { authUser } = useSelector((state: StateProps) => state.user);
  const { shorts, videos } = useSelector((state: StateProps) => state.video);
  const theme = state.theme === "light" ? styles.light : styles.dark;

  const nSkeleton = 10;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoData, setVideoData] = useState<any[]>([]);

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      if (type === "random") {
        videos && setVideoData([...videos]);
        setIsLoading(false);
        return;
      }
      try {
        const res = await getVideos(type, authUser?.accessToken);
        if (res.status === 200) {
          setVideoData(res.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    type && loadVideos();
  }, [type, videos, authUser?.accessToken]);

  return (
    <div className={`${styles.container} ${theme}`}>
      <div className={styles.wrapper}>
        <Header />
        {!isLoading ? (
          <>
            {videos?.length > 0 && (
              <div className={styles.videoWrapper}>
                {videos.map((video) => (
                  <VideoCard key={video?._id} video={video} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className={styles.videoWrapper}>
            {[...Array(nSkeleton)].map((item, index) => (
              <VideoSKCard key={index} />
            ))}
          </div>
        )}

        {!isLoading ? (
          <>
            {shorts?.length > 0 && (
              <>
                <hr />
                <div className={styles.shortWrapper}>
                  {shorts.map((video) => (
                    <ShortCard key={video?._id} video={video} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <hr />
            <div className={styles.shortWrapper}>
              {[...Array(nSkeleton)].map((item, index) => (
                <ShortSKCard key={index} />
              ))}
            </div>
          </>
        )}

        {!isLoading ? (
          <>
            {videoData?.length > 0 && (
              <>
                <hr />
                <div className={styles.videoWrapper}>
                  {videoData.map((video) => (
                    <VideoCard key={video?._id} video={video} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <hr />
            <div className={styles.videoWrapper}>
              {[...Array(nSkeleton)].map((item, index) => (
                <VideoSKCard key={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
