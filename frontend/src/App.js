//import './App.css';
import GetStartedScreen from "./Components/GetStarted.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SigninScreen from "./Components/SignIn.js";
import SignUpScreen from "./Components/SignUp.js";
import HomeScreen from "./Components/Home.js";
import ResetPasswordScreen from "./Components/ResetPassword.js";
import NewPasswordScreen from "./Components/NewPassword.js";
import Topic from "./Components/Admin/Topic.js";
import UserDetails from "./Components/Admin/UserDetails.js";
import DashboardLayout from "./Components/DashboadLayout.js";
import FeedbackPage from "./Components/Admin/Feedback.js";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GetStartedScreen />} />
          <Route path="/SigninScreen" element={<SigninScreen />} />
          <Route path="/SignUpScreen" element={<SignUpScreen />} />
          <Route path="/" element={<DashboardLayout />}>
            <Route path="/HomeScreen" element={<HomeScreen />} />
          </Route>
          <Route
            path="/ResetPasswordScreen"
            element={<ResetPasswordScreen />}
          />
          <Route path="/NewPasswordScreen" element={<NewPasswordScreen />} />
          <Route path="/admin" element={<GetStartedScreen />}></Route>
          <Route path="/" element={<DashboardLayout />}>
            <Route path="/admin/Topic" element={<Topic />} />
            <Route path="/admin/UserDetails" element={<UserDetails />} />
          </Route>
          <Route path="/admin/FeedbackPage" element={<FeedbackPage />}></Route>
          FeedbackPage
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
