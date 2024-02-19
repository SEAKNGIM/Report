import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    allUser: [],
}
export const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAllUser: (state,action)=>{
            state.allUser = action.payload          
        },
    }
   
})
export const {setAllUser} = UserSlice.actions;
export default UserSlice.reducer;