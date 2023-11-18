import { useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import { useEffect } from "react";
import { loginValidation } from "./utils/functions";
import { Navbar } from "./components/Navbar";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  const navigate = useNavigate();
  useEffect(() => (!loginValidation() ? navigate("/login") : undefined), []);

  return (
    <Provider store={store}>
      <div className="bg-white h-full px-24">
        <Navbar />
        <Home />
      </div>
    </Provider>
  );
}

export default App;
