import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./reducers/userReducer"
import snackBar from "./reducers/snackBarReducer"
import responsiveReducer from "./reducers/responsiveReducer"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    snackBar,
    responsiveReducer
  }
})
