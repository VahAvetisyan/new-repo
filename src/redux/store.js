import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/userReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});
