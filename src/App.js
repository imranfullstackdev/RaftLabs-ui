import logo from "./logo.svg";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddBooks from "./Component/AddBooks";
import Login from "./Component/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import ViewBooks from "./Component/ViewBooks";
import Header from "./Component/Header";
import Logout from "./Component/Logout";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/AddBooks" element={<AddBooks />} />
          <Route path="/ViewBooks" element={<ViewBooks />} />
          <Route path="/Logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
