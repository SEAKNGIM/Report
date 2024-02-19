import { createSlice } from "@reduxjs/toolkit";
const initialState={
    rooms: [],
}
export const RoomSlices = createSlice({
    name: "room",
    initialState,
    reducers: {
            setRoom: (state,action)=>{
                 state.rooms = action.payload 
            }
        },
    });
export const {setRoom} = RoomSlices.actions;
export default RoomSlices.reducer;
