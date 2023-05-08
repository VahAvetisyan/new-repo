import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducers/userReducer"
import snackBar from "./reducers/snackBarReducer"
import darkModeReducer from "./reducers/darkModeReducer";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    snackBar,
    darkModeReducer,
  },
});
