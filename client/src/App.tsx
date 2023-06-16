import { useContext } from "react";
import "../src/assets/css/global.css";
import { Navbar } from "./components/Navbar";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const { state, dispatch } = useContext(ThemeContext);
  console.log(state);
  return (
    <>
      <Navbar />
      <h4>Hello from React</h4>
      <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
        Toggle Theme
      </button>
    </>
  );
}

export default App;
