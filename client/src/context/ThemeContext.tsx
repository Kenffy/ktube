import React, { createContext, useReducer } from "react";

const INIT_STATE = {
  theme: "dark",
};

type ActionType = {
  type: "TOGGLE_THEME";
};

type StateType = {
  theme: string;
};

export const ThemeContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: INIT_STATE,
  dispatch: () => {},
});

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "dark" ? "light" : "dark",
      };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      <div className={`kw-ctn kw-theme ${state.theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
