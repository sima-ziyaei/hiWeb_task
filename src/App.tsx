import {
  useNavigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import { useEffect } from "react";
import { loginValidation } from "./utils/functions";
import {Navbar }from "./components/Navbar";

function App() {
  const navigate  = useNavigate();
  useEffect(()=>!loginValidation() ? navigate('/login') : undefined ,[])

  return (
    <div className="bg-white h-full px-24">
    <Navbar />
    <Home />
    </div>
  )
}

export default App
