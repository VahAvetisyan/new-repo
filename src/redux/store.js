import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducers/userReducer"
import snackBar from "./reducers/snackBarReducer"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    snackBar
  }
})
