import styles from "../assets/css/pages/short.module.css";
import ReactPlayer from "react-player";

export const Short = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.playerWrapper}>
          <ReactPlayer
            height="100%"
            width="100%"
            controls
            url={`https://www.youtube.com/shorts/3Pg27qpQXVg`}
            config={{
              youtube: {
                playerVars: { showinfo: 1 },
              },
              facebook: {
                appId: "12345",
              },
            }}
          />
          <div className={styles.rightWrapper}>
            <div className={styles.rightItem}>
              <div className={styles.rightIcon}>
                <i className="fa-regular fa-heart"></i>
              </div>
              <span>278</span>
            </div>

            <div className={styles.rightItem}>
              <div className={styles.rightIcon}>
                <i className="fa-solid fa-comment"></i>
              </div>
              <span>120</span>
            </div>

            <div className={styles.rightItem}>
              <div className={styles.rightIcon}>
                <i className="fa-solid fa-share"></i>
              </div>
              <span>share</span>
            </div>

            <div className={styles.rightItem}>
              <div className={styles.rightIcon}>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
              <span></span>
            </div>
          </div>
          <div className={styles.bottomWrapper}>
            <p className={styles.title}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, placeat.
            </p>
            <div className={styles.actionWrapper}>
              <div className={styles.userWrapper}>
                <img
                  src="https://leadership.ng/wp-content/uploads/2023/03/davido.png"
                  alt=""
                />
                <span>Chaîne officielle TVL</span>
              </div>
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        <div className={styles.playerWrapper}>
          <ReactPlayer
            height="100%"
            width="100%"
            controls
            url={`https://www.youtube.com/shorts/TKRdD5QsgbU`}
            config={{
              youtube: {
                playerVars: { showinfo: 1 },
              },
              facebook: {
                appId: "12345",
              },
            }}
          />
          <div className={styles.rightWrapper}>
            <div className={styles.rightItem}>
              <div className={styles.rightIcon}>
                <i className="fa-regular fa-heart"></i>
              </div>
              <span>278</span>
            </div>

            <div className={styles.rightItem}>
              <div className={styles.rightIcon}>
                <i className="fa-solid fa-comment"></i>
              </div>
              <span>120</span>
            </div>

            <div className={styles.rightItem}>
              <div className={styles.rightIcon}>
                <i className="fa-solid fa-share"></i>
              </div>
              <span>share</span>
            </div>

            <div className={styles.rightItem}>
              <div className={styles.rightIcon}>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
              <span></span>
            </div>
          </div>
          <div className={styles.bottomWrapper}>
            <p className={styles.title}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, placeat.
            </p>
            <div className={styles.actionWrapper}>
              <div className={styles.userWrapper}>
                <img
                  src="https://leadership.ng/wp-content/uploads/2023/03/davido.png"
                  alt=""
                />
                <span>Channel Name</span>
              </div>
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        <div className={styles.playerWrapper}>
          <ReactPlayer
            height="100%"
            width="100%"
            controls
            url={`https://www.youtube.com/shorts/iF_27-R0PAg`}
            config={{
              youtube: {
                playerVars: { showinfo: 1 },
              },
              facebook: {
                appId: "12345",
              },
            }}
          />
          <div className={styles.rightWrapper}>
            <div className={styles.rightItem}>
              <div className={styles.rightIcon}>
                <i className="fa-regular fa-heart"></i>
              </div>
              <span>278</span>
            </div>

            <div className={styles.rightItem}>
              <div className={styles.rightIcon}>
                <i className="fa-solid fa-comment"></i>
              </div>
              <span>120</span>
            </div>

            <div className={styles.rightItem}>
              <div className={styles.rightIcon}>
                <i className="fa-solid fa-share"></i>
              </div>
              <span>share</span>
            </div>

            <div className={styles.rightItem}>
              <div className={styles.rightIcon}>
                <i className="fa-solid fa-ellipsis"></i>
              </div>
              <span></span>
            </div>
          </div>
          <div className={styles.bottomWrapper}>
            <p className={styles.title}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, placeat.
            </p>
            <div className={styles.actionWrapper}>
              <div className={styles.userWrapper}>
                <img
                  src="https://leadership.ng/wp-content/uploads/2023/03/davido.png"
                  alt=""
                />
                <span>Channel Name</span>
              </div>
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
