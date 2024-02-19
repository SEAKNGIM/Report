import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    allsubjects: [],
    currentUserSubjects: [],
}
export const SubjetSlices = createSlice({
    name: "subject",
    initialState,
    reducers: {
        setAllSubject: (state,action)=>{
            state.allsubjects = action.payload 
            
        },
        setCurrentSubject: (state,action)=>{
            state.currentUserSubjects = action.payload 
            
        },
    }
   
})
export const {setAllSubject,setCurrentSubject} = SubjetSlices.actions;
export default SubjetSlices.reducer;