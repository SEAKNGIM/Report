import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currenShifts: [],
    allShifts: [],
}
export const ShiftSlices = createSlice({
    name: "shift",
    initialState,
    reducers: {
        setCurrenShifts: (state,action)=>{
            state.currenShifts = action.payload
        },
        setAllShifts: (state,action)=>{
            state.allShifts = action.payload
        }
    }
})
export const {setCurrenShifts,setAllShifts} = ShiftSlices.actions;
export default ShiftSlices.reducer;