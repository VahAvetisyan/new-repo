import {createSlice} from "@reduxjs/toolkit"

let initialState = {screenSize: 5}

let responsiveReducer = createSlice({
  name: "screenSize",
  initialState,
  reducers: {
    setScreenSize: (state, {payload}) => {
      console.log(payload,'11')
      state = payload
      console.log(payload, "changed");
    }
  }
})

export default responsiveReducer.reducer
export const {setScreenSize} = responsiveReducer.actions
export const selectResponsive = (state) => state.responsiveReducer.screenSize
