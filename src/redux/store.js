import { configureStore } from "@reduxjs/toolkit";
import ReportSlices from "./slices/ReportSlices";
import RoomSlices from "./slices/RoomSlices";
import ShiftSlices from "./slices/ShiftSlices";
import SubjectSlices from "./slices/SubjectSlices";
import UserSlice from "./slices/UserSlice";


const store= configureStore({
    reducer: {
      report: ReportSlices,
      room: RoomSlices,
      shift: ShiftSlices,
      subject: SubjectSlices,
      user: UserSlice
    }
 })
 export default store;