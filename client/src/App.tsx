import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import "../src/assets/css/global.css";
//import { Navbar } from "./components/Navbar";
import { Topbar } from "./components/Topbar";

const Home = lazy(() =>
  import("./pages/Home").then(({ Home }) => ({ default: Home }))
);
const Single = lazy(() =>
  import("./pages/Single").then(({ Single }) => ({ default: Single }))
);
const Login = lazy(() =>
  import("./pages/Login").then(({ Login }) => ({ default: Login }))
);
const Register = lazy(() =>
  import("./pages/Register").then(({ Register }) => ({ default: Register }))
);

function App() {
  return (
    <BrowserRouter>
      <Topbar />
      {/* <Navbar /> */}
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/videos/:id"
          element={
            <Suspense>
              <Single />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <Suspense>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense>
              <Register />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
