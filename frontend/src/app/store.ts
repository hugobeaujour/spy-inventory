// libraries
import { configureStore } from "@reduxjs/toolkit";

// redux
import contentReducer from "../features/content-slice";
import userReducer from "../features/user-slice";

export const store = configureStore({
    reducer: {
        contentStore: contentReducer,
        userStore: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RouteState = ReturnType<typeof store.getState>;
