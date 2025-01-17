
import {Routes, Route  } from "react-router";
import Navbar from "./components/common/Navbar"
import Footer from "./components/common/Footer";
import LandingPage from "./components/pages/landing/Landing"; 
import MonitorPage from "./components/pages/monitor/Monitor";
import ChartsPage from "./components/pages/charts/Charts";
import LoginPage from "./components/pages/login/Login";
import ControlPanelPage from "./components/pages/control/Control";
import {RequireAuth, IsAuth} from "./components/auth/Auth";
import NotFoundPage from "./components/pages/except/404";
import NotAccesiblePage from "./components/pages/except/401";
import './App.css'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/monitor" element={<MonitorPage/>}/>
        <Route path="/registros" element={<ChartsPage/>}/>
        <Route path="/iniciar-sesión" element={
          <IsAuth>
          <LoginPage/>
          </IsAuth>}/>
        <Route
        path="/panel"
        element={
          <RequireAuth>
            <ControlPanelPage />
          </RequireAuth>
                        } 
        />
        <Route path="/sin-autorización" element={<NotAccesiblePage />} />
        <Route path="/*" element={<NotFoundPage/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
