import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Auth/Login";
import Register from "./component/Auth/Register";
import Home from "./component/Home/Home";
import Profile from "./component/Home/Profile/Profile";
import Upload from "./component/Upload/Upload";
import Home1 from "./component/Department/Home/Home";
import SubjectsView from "./component/Department/Card/SubjectsView";
import NotesBySubject from "./component/Department/Card/NotesBySubject";
import ViewNote from "./component/Department/Card/ViewNote";
import University from "./component/University/University";
import CourseSubjects from "./component/Department/Card/SubjectsView";
import UniversityCourses from "./component/Home/Home";
import Root from "./component/Root";
import Subjects from "./component/Department/Subject/Subjects";
import EmailVerification from "./component/News/EmalVerification";
import ProtectedRoute from "./component/ProtectRoute";
import ForgetPassword from "./component/Auth/ForgetPassword";
import ResetPass from "./component/Auth/ResetPass";
import AdminLogin from "./component/Auth/Admin";
import CreateAdmin from "./component/Auth/CreateAdmin";
import Dashboard from "./component/Dashbord/Dashbord";
import CoursesManagement from "./component/Admin/Cource";
import SubjectsManagement from "./component/Admin/Subject";
import AddUniversity from "./component/Admin/AddUniversity";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />

        <Route path="/subjects" element={<Subjects />} />
        <Route path="/subjects/:subject" element={<NotesBySubject />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgetPassword/>}/>
        <Route path="/resetpass/:token" element={<ResetPass />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<CreateAdmin />} />
        <Route path="/register" element={<Register />} />
        
        {/* <Route path="/home" element={<Home />} /> */}

        {/* Note Viewing Route */}
        <Route path="/view-note/:filePath" element={<ViewNote />} />
        <Route path="/university" element={<University />} />
        <Route path="/universities/:university" element={<Home />} />
        <Route
          path="/universities/:university/departments/:department"
          element={<Home1 />}
        />
        <Route
          path="/university-courses/:universityId"
          element={<UniversityCourses />}
        />
        <Route
          path="/university-courses/:universityId/course/:courseId"
          element={<CourseSubjects />}
        />

        {/* Add the missing route for notes by subject from university/course */}
        <Route
          path="/university/:university/course/:course/subject/:subject"
          element={<NotesBySubject />}
        />

        {/* ProtectedRoute */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/Admin/Dashbord" element={<Dashboard />} />
        <Route path="/admin/universities" element={<AddUniversity />} />
        <Route path="/admin/courses" element={<CoursesManagement />} />
        <Route path="/admin/subjects" element={<SubjectsManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
