import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import appApi from "./appApi";

import errorReducer from "./errorSlice";
import { rtkErrorLogger } from "./middlewares";

const reducers = combineReducers({
    [appApi.reducerPath]: appApi.reducer,
    error: errorReducer, // Error Reducer 추가
});

export const store = () => {
    return configureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ["persist/PERSIST"],
                },
            }).concat(appApi.middleware, rtkErrorLogger),
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
