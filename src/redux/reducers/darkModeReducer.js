import { createSlice } from "@reduxjs/toolkit";


let initialState={
       backgroundColor:'white'
}


let DarkMode=createSlice({
name:'DarkMode',
initialState,
reducers:{
    changeBackgroundColor:(state,{payload})=>{
             state.backgroundColor = payload;
    }
}
})

export default DarkMode.reducer;

export const { changeBackgroundColor } = DarkMode.actions;

export const setBackgroundColor = (state) => state.DarkMode.backgroundColor;
