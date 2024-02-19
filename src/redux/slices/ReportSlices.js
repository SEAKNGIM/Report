import { createSlice } from "@reduxjs/toolkit";

const initialState={
    reports: [],
    reportCurrenUser:[],
    reportById:{}
}

export const ReportSlices = createSlice({
name: "Report",
initialState,
reducers:{
    setReport: (state, action)=>{
        state.reports = action.payload
    },
    setReportCurrenUser: (state, action)=>{
        state.reportCurrenUser = action.payload
    },
    setReportById: (state,action)=>{
        state.reportById = action.payload
    }
    
},
});
export const {setReport,setReportCurrenUser,setReportById} = ReportSlices.actions;
export default ReportSlices.reducer;
