import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import "../src/assets/css/global.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
//import { Navbar } from "./components/Navbar";
import { Topbar } from "./components/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { StateProps } from "./types/types";
import { loadUserData } from "./redux/userSlice";
import { getUser } from "./services/services";

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

function App() {
  const { authUser } = useSelector((state: StateProps) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      if (authUser) {
        try {
          const res = await getUser(authUser?.id, authUser?.accessToken);
          if (res.status === 200) {
            dispatch(loadUserData(res.data));
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchUserData();
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
                <Suspense fallback={<div>Loading...</div>}>
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
              path="channel/videos"
              element={
                <Suspense>
                  {authUser ? <Home type="channel" /> : <Login />}
                </Suspense>
              }
            />

            <Route
              path="subs"
              element={
                <Suspense>
                  {authUser ? <Home type="subs" /> : <Login />}
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
              ></Route>
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
            </Route>
            <Route
              path="login"
              element={
                <Suspense>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="register"
              element={
                <Suspense>
                  <Register />
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
