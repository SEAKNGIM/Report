
import './App.css';
import { Route, Routes, useLocation, } from 'react-router-dom'
import ReportListCompont from './component/report/ReportListCompont';
import TeacherComponent from './component/lecturer/TeacherComponent';
import LecturerList from './component/lecturer/LecturerList';
import LoginComponent from './component/auth/LoginComponent';
import ProtectedRoute from './utils/ProtectedRoute';
import MainComponent from './component/layout/MainComponent';
import Dashboard from './component/report/Dashboard';
import HomePage from './component/HomePage';
import ShiftListComponent from './component/shift/ShiftListComponent';
import SubjectComponent from './component/subject.jsx/SubjectComponent';
import ReportAllUserComponent from './component/report/ReportAllUserComponent';
import AllShiftLishComponent from './component/shift/AllShiftLishComponent';
import AllSubjectComponent from './component/subject.jsx/AllSubjectComponent';
import RoomComponent from './component/room/RoomComponent';
import AllUserComponent from './component/user/AllUserComponent';
import SignUpComponents from './component/signUp/SignUpComponents';

function App() {
  const user = localStorage.getItem("token")
  // useLayoutEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "auto" });
  // }, [pathname]);
  return (
    <>
      <Routes >
        <Route path='/' element={<HomePage />} />
        <Route path='/signin' element={<LoginComponent />} />
        <Route path='/signup' element={<SignUpComponents />} />
        <Route element={<ProtectedRoute isLogged={localStorage.getItem("token") ? true : false} />}>
          <Route path="/" element={<MainComponent />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/report-list' element={<ReportListCompont />} />
            <Route path='/teacher' element={<TeacherComponent />} />
            <Route path='/lecturer-list' element={<LecturerList />} />
            <Route path='/shift-list/current' element={<ShiftListComponent />} />
            <Route path='/subject-list/current' element={<SubjectComponent/>} />
            <Route path='/report-list/current' element={<ReportAllUserComponent/>} />
            <Route path='/shift-list' element={<AllShiftLishComponent/>} />
            <Route path='/subject-list' element={<AllSubjectComponent/>} />
            <Route path='/room-list' element={<RoomComponent/>} />
            <Route path='/user-list' element={<AllUserComponent/>} />
          </Route>
        </Route>
      </Routes >
    </>
  );
}

export default App;
