import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Finance from "./pages/Finance";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/finance" element={<Finance />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
