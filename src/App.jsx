import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Confirm from "./pages/Confirm";
import ForgotPassword from "./pages/ForgotPassword";
import ConfirmPassword from "./pages/ConfirmPassword";
import Dashboard from "./pages/DashBoard";
// import Callback from "./pages/Callback";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirm-password" element={<ConfirmPassword />} />
        <Route path="*" element={<Navigate to="/signin" />} />
        {/* <Route path="/callback" element={<Callback />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

