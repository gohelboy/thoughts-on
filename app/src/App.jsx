import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Login from "./pages/Auth/Login/Login"
import { routes } from "./routes"
import NotFound from "./pages/NotFound/NotFound"
import Home from "./pages/home/Home"
import Profile from "./pages/Profile/Profile"
import Signup from "./pages/Auth/Signup/Signup"
import UsernameSelection from "./pages/Auth/Signup/UsernameSelection"
import SentMailAccountActivation from "./pages/Auth/SentMailAccountActivation/SentMailAccountActivation"
import GoogleLogin from "./pages/GoogleLogin/GoogleLogin"
import VerifyUser from "./pages/Auth/Activation/Verifyuser"
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword"
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword"
import AuthWrapper from "./pages/AuthWrapper/AuthWrapper"

function App() {
  return <>
    <Toaster toastOptions={{ error: { duration: 3000 } }} />
    <Router>
      <Routes>
        <Route exact path={routes.homepage} element={<AuthWrapper><Home /></AuthWrapper>} />
        <Route exact path={routes.login} element={<Login />} />
        <Route exact path={routes.forgotPassword} element={<ForgotPassword />} />
        <Route exact path={routes.resetPassword} element={<ResetPassword />} />
        <Route exact path={routes.signup} element={<Signup />} />
        <Route exact path={routes.activateAccount} element={<SentMailAccountActivation />} />
        <Route exact path={routes.activatationPage} element={<VerifyUser />} />
        <Route exact path={routes.usernameSelection} element={<UsernameSelection />} />
        <Route exact path={routes.profile} element={<Profile />} />
        <Route exact path={routes.googleLogin} element={<GoogleLogin />} />
        <Route exact path={'*'} element={<NotFound />} />
      </Routes>
    </Router>
  </>
}

export default App
