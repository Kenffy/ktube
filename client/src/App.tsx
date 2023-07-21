import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import "../src/assets/css/global.css";
import "../src/assets/css/editor.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Topbar } from "./components/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "./types/types";
import { loadUserData } from "./redux/userSlice";
import { getRandomShorts, getRandomVideos, getUser } from "./services/services";
import {
  fetchAllShortsSuccess,
  fetchAllVideoSuccess,
} from "./redux/videoSlice";

const Home = lazy(() =>
  import("./pages/Home").then(({ Home }) => ({ default: Home }))
);
const Single = lazy(() =>
  import("./pages/Single").then(({ Single }) => ({ default: Single }))
);
const Short = lazy(() =>
  import("./pages/Short").then(({ Short }) => ({ default: Short }))
);
const Login = lazy(() =>
  import("./pages/Login").then(({ Login }) => ({ default: Login }))
);
const Register = lazy(() =>
  import("./pages/Register").then(({ Register }) => ({ default: Register }))
);

const Channel = lazy(() =>
  import("./pages/Channel").then(({ Channel }) => ({ default: Channel }))
);

const AddVideo = lazy(() =>
  import("./pages/AddVideo").then(({ AddVideo }) => ({ default: AddVideo }))
);

const AddShort = lazy(() =>
  import("./pages/AddShort").then(({ AddShort }) => ({ default: AddShort }))
);

const UnAuthCard = lazy(() =>
  import("./components/UnAuthCard").then(({ UnAuthCard }) => ({
    default: UnAuthCard,
  }))
);

function App() {
  const { authUser } = useSelector((state: StateProps) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      if (authUser) {
        try {
          const res_user = await getUser(authUser?.id);
          const res_shorts = await getRandomShorts();
          const res_videos = await getRandomVideos();
          if (res_user.status === 200) {
            dispatch(loadUserData(res_user.data));
          }
          if (res_shorts.status === 200) {
            dispatch(fetchAllShortsSuccess(res_shorts.data));
          }
          if (res_videos.status === 200) {
            dispatch(fetchAllVideoSuccess(res_videos.data));
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    authUser && fetchUserData();
  }, [authUser, dispatch]);

  return (
    <BrowserRouter>
      <Topbar />
      {/* <Navbar /> */}
      <div className="ctn">
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <Suspense>
                  <Home type="random" />
                </Suspense>
              }
            />

            <Route
              path="trends"
              element={
                <Suspense>
                  <Home type="trends" />
                </Suspense>
              }
            />

            <Route
              path="channel/videos/:id"
              element={
                <Suspense>
                  {authUser ? (
                    <Channel />
                  ) : (
                    <UnAuthCard
                      type="My Videos"
                      icon="fa-solid fa-circle-play"
                    />
                  )}
                </Suspense>
              }
            />

            <Route path="videos">
              <Route
                path=":id"
                element={
                  <Suspense>
                    <Single />
                  </Suspense>
                }
              />

              <Route
                path="create"
                element={
                  <Suspense>{authUser ? <AddVideo /> : <Login />}</Suspense>
                }
              />

              <Route
                path="subscriptions"
                element={
                  <Suspense>
                    {authUser ? (
                      <Home type="sub" />
                    ) : (
                      <UnAuthCard
                        type="Subscriptions"
                        icon="fa-solid fa-users-rectangle"
                      />
                    )}
                  </Suspense>
                }
              />

              <Route
                path="history"
                element={
                  <Suspense>
                    {authUser ? (
                      <Home type="history" />
                    ) : (
                      <UnAuthCard
                        type="History"
                        icon="fa-solid fa-clock-rotate-left"
                      />
                    )}
                  </Suspense>
                }
              />

              <Route
                path="playlist"
                element={
                  <Suspense>
                    {authUser ? (
                      <Home type="playlist" />
                    ) : (
                      <UnAuthCard
                        type="Playlist"
                        icon="fa-solid fa-layer-group"
                      />
                    )}
                  </Suspense>
                }
              />
            </Route>

            <Route path="shorts">
              <Route
                index
                element={
                  <Suspense>
                    <Short type="random" />
                  </Suspense>
                }
              />
              <Route
                path=":id"
                element={
                  <Suspense>
                    <Short type="select" />
                  </Suspense>
                }
              />
              <Route
                path="create"
                element={
                  <Suspense>{authUser ? <AddShort /> : <Login />}</Suspense>
                }
              />
            </Route>
            <Route
              path="channel/:id"
              element={
                <Suspense>{authUser ? <Channel /> : <Login />}</Suspense>
              }
            />
            <Route
              path="login"
              element={
                <Suspense>
                  {!authUser ? <Login /> : <Home type="random" />}
                </Suspense>
              }
            />
            <Route
              path="register"
              element={
                <Suspense>
                  {!authUser ? <Register /> : <Home type="random" />}
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
