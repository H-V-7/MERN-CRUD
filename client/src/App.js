import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import CreateUser from "./components/CreateUser";
import User from "./components/Users";
import UpdateUser from "./components/UpdateUser"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User />}/>
        <Route path="/add" element={<CreateUser />} />
        <Route path="/update/:id" element={<UpdateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
