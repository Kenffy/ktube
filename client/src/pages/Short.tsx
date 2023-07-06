import styles from "../assets/css/pages/short.module.css";
//import { shortVideos } from "../seeds/shortData";
import { ShortPlayerCrad } from "../components/ShortPlayerCrad";
import { useEffect, useState } from "react";
import { IVideo } from "../types/types";
import { useDispatch } from "react-redux";
import { getShorts } from "../services/services";
import { useParams } from "react-router-dom";

type shortProps = {
  type: string;
};

export const Short = ({ type }: shortProps) => {
  const dispatch = useDispatch();
  const params = useParams();

  const [videos, setVideos] = useState<IVideo[]>([]);

  const shortId = params?.id;

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const res = await getShorts();
        if (res.status === 200) {
          const tempVideos = res.data.sort((a: any, b: any) => {
            return a._id === shortId ? -1 : b._id === shortId ? 1 : 0;
          });
          if (shortId) {
            setVideos(tempVideos);
          } else {
            setVideos(res.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadVideos();
  }, [shortId, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {videos.map((shVideo) => (
          <ShortPlayerCrad key={shVideo._id} video={shVideo} />
        ))}
      </div>
    </div>
  );
};
