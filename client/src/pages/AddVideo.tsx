import { useState } from "react";
import styles from "../assets/css/pages/addvideo.module.css";
import { v4 as uuidv4 } from "uuid";
import ReactPlayer from "react-player";
import { Editor } from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { IFile, IVideo, StateProps, VideoModel } from "../types/types";
import { createVideo, updateVideo } from "../services/services";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideoSuccess } from "../redux/videoSlice";
import { compressImage, uploadImage } from "../utils/helper";

type upsertProps = {
  upsertVideo?: IVideo;
  setOnEdit?: React.Dispatch<React.SetStateAction<Boolean>>;
  setUpdatedVideo?: React.Dispatch<React.SetStateAction<any>>;
};

export const AddVideo = ({
  upsertVideo,
  setUpdatedVideo,
  setOnEdit,
}: upsertProps) => {
  const { authUser } = useSelector((state: StateProps) => state.user);

  const [title, setTitle] = useState<string>(
    upsertVideo ? upsertVideo?.title : ""
  );
  const [coverUrl, setCoverUrl] = useState<string>(
    upsertVideo ? upsertVideo?.imgUrl : ""
  );
  const [body, setBody] = useState<string>(
    upsertVideo ? upsertVideo?.desc : ""
  );
  const [youtube, setYoutube] = useState<boolean>(true);
  const [youtubeUrl, setYoutubeUrl] = useState<string>(
    upsertVideo ? upsertVideo?.videoUrl : ""
  );
  const [cover, setCover] = useState<IFile>();
  const [video, setVideo] = useState<IFile>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCoverFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const newCover = {
        filename: uuidv4() + file.name,
        file: file,
        type: "Cover",
      };
      setCover(newCover);
    }
  };

  const handleVideoFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const newVideo = {
        filename: uuidv4() + file.name,
        file: file,
        type: "video",
      };
      setVideo(newVideo);
    }
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

  const handleRemoveCover = () => {
    cover && setCover(undefined);
    coverUrl && setCoverUrl("");
  };

  const handleRemoveVideo = () => {
    video && setVideo(undefined);
    youtubeUrl && setYoutubeUrl("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let tmpCoverUrl = "";
    let tmpVideoUrl = "";
    if (cover) {
      // Compress the image
      const compressedImage: any = await compressImage(cover.file, {
        height: 360,
        width: 500,
      });

      // Create a new File object with the compressed image data
      const compressedFile = new File([compressedImage], cover.filename, {
        type: cover.file.type,
        lastModified: cover.file.lastModified,
      });
      const newFile = {
        ...cover,
        file: compressedFile,
      };
      const location = `/kwatch/covers/`;
      tmpCoverUrl = await uploadImage(newFile, location);
    }

    if (video) {
      // upload videos
      const location = `/kwatch/videos/`;
      tmpVideoUrl = await uploadImage(video, location);
    }

    if (upsertVideo) {
      const tmpVideo: VideoModel = {
        ...upsertVideo,
        title,
        desc: body,
        imgUrl: cover && tmpCoverUrl.length > 0 ? tmpCoverUrl : coverUrl,
        videoUrl: video && tmpVideoUrl.length > 0 ? tmpVideoUrl : youtubeUrl,
      };
      // update
      const res = await updateVideo(tmpVideo, authUser?.accessToken);
      if (res.status === 200) {
        dispatch(fetchVideoSuccess(res.data));
        //navigate(`/videos/${res.data?._id}`);
        setUpdatedVideo && setUpdatedVideo(res.data);
        setOnEdit && setOnEdit(false);
      }
    } else {
      // create
      const tmpVideo: VideoModel = {
        title,
        desc: body,
        imgUrl: cover && tmpCoverUrl.length > 0 ? tmpCoverUrl : coverUrl,
        videoUrl: video && tmpVideoUrl.length > 0 ? tmpVideoUrl : youtubeUrl,
        isShort: false,
      };

      const res = await createVideo(tmpVideo, authUser?.accessToken);
      if (res.status === 200) {
        dispatch(fetchVideoSuccess(res.data));
        navigate(`/videos/${res.data?._id}`);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.headingWrapper}>
          <div
            className={styles.backBtn}
            onClick={
              upsertVideo
                ? () => setOnEdit && setOnEdit(false)
                : () => navigate(-1)
            }
          >
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <span className={styles.heading}>
            {upsertVideo ? "Update Video" : "Upload new video"}
          </span>
        </div>
        <div className={styles.mediaWrapper}>
          <div className={styles.uploadBtnWrapper}>
            <div className={styles.btnItem}>
              <label htmlFor="upload-video-file">
                <input
                  style={{ display: "none" }}
                  disabled={youtube}
                  accept=".mp4,.avi,.mpeg"
                  id="upload-video-file"
                  type="file"
                  onChange={handleVideoFiles}
                />
                <i
                  className={`fa-solid fa-video ${youtube && styles.disabled}`}
                ></i>
              </label>
            </div>
            <div className={styles.btnItem}>
              <label htmlFor="upload-cover-file">
                <input
                  style={{ display: "none" }}
                  accept=".jpg,.jpeg,.png"
                  id="upload-cover-file"
                  type="file"
                  onChange={handleCoverFiles}
                />
                <i className="fa-solid fa-photo-film"></i>
              </label>
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
          {(cover || coverUrl) && (
            <div className={styles.mediaCover}>
              <i
                onClick={handleRemoveCover}
                className="fa-solid fa-rectangle-xmark"
              ></i>
              <img
                src={cover ? URL.createObjectURL(cover?.file) : coverUrl}
                alt={cover ? cover?.filename : "video cover"}
              />
            </div>
          )}
          {(video || youtubeUrl) && (
            <div className={styles.mediaPlayer}>
              <i
                onClick={handleRemoveVideo}
                className="fa-solid fa-rectangle-xmark"
              ></i>
              <ReactPlayer
                height="100%"
                width="100%"
                controls
                url={video ? URL.createObjectURL(video?.file) : youtubeUrl}
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
          )}
        </div>
        <div className={styles.infoWrapper}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              required={true}
              value={title}
              type="text"
              placeholder="Tilte"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              required={true}
              value={youtubeUrl}
              disabled={!youtube}
              type="url"
              placeholder="Youtube url"
              onChange={(e) => setYoutubeUrl(e.target.value)}
            />

            <Editor body={body} setBody={setBody} />
            {/* <textarea
              value={body}
              placeholder="Enter your text here."
              onChange={(e) => setBody(e.target.value)}
            ></textarea> */}
            <button type="submit">{upsertVideo ? "Save" : "Upload"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};
