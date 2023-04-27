import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: { open: false, message: "", severity: "success" }
}

const SnackBarReducer = createSlice({
  name: "snackBar",
  initialState,
  reducers: {
    setSnackBarData(state, { payload }) {
      state.data = { ...state.data, ...payload }
    }
  }
})

export default SnackBarReducer.reducer

export const { setSnackBarData } = SnackBarReducer.actions

export const selectSnackBarData = (state) => state.snackBar.data
