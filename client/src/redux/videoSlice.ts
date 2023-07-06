import { createSlice } from "@reduxjs/toolkit";
import { VideoSliceProps } from "../types/types";

const initialState: VideoSliceProps = {
  videos: [],
  shorts: [],
  currentVideo: null,
  currentShort: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state: VideoSliceProps) => {
      state.loading = true;
    },
    addVideoSuccess: (state: VideoSliceProps, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
      state.videos.push(action.payload);
    },
    removeVideoSuccess: (state: VideoSliceProps, action) => {
      state.loading = false;
      state.currentVideo = null;
      state.videos.filter((item) => item._id !== action.payload._id);
    },
    fetchVideoSuccess: (state: VideoSliceProps, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchShortSuccess: (state: VideoSliceProps, action) => {
      state.loading = false;
      state.currentShort = action.payload;
    },
    fetchAllVideoSuccess: (state: VideoSliceProps, action) => {
      state.loading = false;
      state.videos = action.payload;
    },
    fetchAllShortsSuccess: (state: VideoSliceProps, action) => {
      state.loading = false;
      state.shorts = action.payload;
    },
    fetchFailure: (state: VideoSliceProps) => {
      state.loading = false;
      state.error = true;
    },
    like: (state: VideoSliceProps, action) => {
      if (state.currentVideo) {
        if (!state.currentVideo.likes.includes(action.payload)) {
          state.currentVideo.likes.push(action.payload);
          state.currentVideo.dislikes.splice(
            state.currentVideo.dislikes.findIndex(
              (userId) => userId === action.payload
            ),
            1
          );
        }
      }
    },
    dislike: (state: VideoSliceProps, action) => {
      if (state.currentVideo) {
        if (!state.currentVideo.dislikes.includes(action.payload)) {
          state.currentVideo.dislikes.push(action.payload);
          state.currentVideo.likes.splice(
            state.currentVideo.likes.findIndex(
              (userId) => userId === action.payload
            ),
            1
          );
        }
      }
    },
  },
});

export const {
  fetchStart,
  fetchVideoSuccess,
  fetchAllVideoSuccess,
  fetchAllShortsSuccess,
  fetchFailure,
  like,
  dislike,
} = videoSlice.actions;

export default videoSlice.reducer;
