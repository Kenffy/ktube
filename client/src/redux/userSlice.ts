import { createSlice } from "@reduxjs/toolkit";
import { UserSliceProps } from "../types/types";

const initialState: UserSliceProps = {
  authUser: null,
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state: UserSliceProps) => {
      state.loading = true;
    },
    loginSuccess: (state: UserSliceProps, action) => {
      state.loading = false;
      state.authUser = action.payload;
    },
    loadUserData: (state: UserSliceProps, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state: UserSliceProps) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state: UserSliceProps) => {
      state.authUser = null;
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    subscription: (state: UserSliceProps, action) => {
      if (state.currentUser) {
        if (state.currentUser.subscriptions.includes(action.payload)) {
          state.currentUser.subscriptions.splice(
            state.currentUser.subscriptions.findIndex(
              (channelId) => channelId === action.payload
            ),
            1
          );
        } else {
          state.currentUser.subscriptions.push(action.payload);
        }
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loadUserData,
  loginFailure,
  logout,
  subscription,
} = userSlice.actions;

export default userSlice.reducer;
