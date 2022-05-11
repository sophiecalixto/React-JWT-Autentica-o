import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authAPI } from "../services/authAPI";
import authReducer from "../features/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);