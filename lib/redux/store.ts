import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./slice/ImageSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      image: imageReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
