import { useState } from "react";
import styles from "../assets/css/pages/addvideo.module.css";
import { v4 as uuidv4 } from "uuid";
import ReactPlayer from "react-player";

interface IFile {
  filename: string;
  file: any;
  type: string;
}

export const AddVideo = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [youtube, setYoutube] = useState<boolean>(true);
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [cover, setCover] = useState<IFile>();
  const [video, setVideo] = useState<IFile>();

  const handleCoverFiles = (e: any) => {
    const file = e.target.files[0];
    const newCover = {
      filename: uuidv4() + file.name,
      file: file,
      type: "Cover",
    };
    setCover(newCover);
  };

  const handleVideoFiles = (e: any) => {
    const file = e.target.files[0];
    const newVideo = {
      filename: uuidv4() + file.name,
      file: file,
      type: "video",
    };
    setVideo(newVideo);
  };

  const handleOnYoutube = (e: any) => {
    if (youtube) {
      setYoutubeUrl("");
      setYoutube(!youtube);
    } else {
      setVideo(undefined);
      setYoutube(!youtube);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.headingWrapper}>
          <div className={styles.backBtn}>
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <span className={styles.heading}>Upload new video</span>
        </div>
        <div className={styles.mediaWrapper}>
          <div className={styles.uploadBtnWrapper}>
            <div className={styles.btnItem}>
              <i className="fa-solid fa-video"></i>
            </div>
            <div className={styles.btnItem}>
              <i className="fa-solid fa-photo-film"></i>
            </div>
            <div className={styles.btnItem} onClick={handleOnYoutube}>
              {youtube ? (
                <i className="fa-solid fa-toggle-on"></i>
              ) : (
                <i className="fa-solid fa-toggle-off"></i>
              )}
              <span>Youtube Url</span>
            </div>
          </div>
          <div className={styles.mediaCover}>
            <i
              onClick={() => setCover(undefined)}
              className="fa-solid fa-rectangle-xmark"
            ></i>
            <img
              src={
                "https://leadership.ng/wp-content/uploads/2023/03/davido.png"
              }
              alt={cover?.filename}
            />
          </div>
          <div className={styles.mediaPlayer}>
            <ReactPlayer
              height="100%"
              width="100%"
              controls
              url={`https://www.youtube.com/watch?v=TX9qSaGXFyg`}
              config={{
                youtube: {
                  playerVars: { showinfo: 1 },
                },
                facebook: {
                  appId: "12345",
                },
              }}
            />
          </div>
        </div>
        <div className={styles.infoWrapper}>
          <form className={styles.form}>
            <input
              value={title}
              type="text"
              placeholder="Tilte"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              value={youtubeUrl}
              disabled={!youtube}
              type="text"
              placeholder="Youtube url"
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />
            <textarea
              value={body}
              placeholder="Enter your text here."
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <button>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};
