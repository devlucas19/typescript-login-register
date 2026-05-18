import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./Components/Login"
import Profile from "./Components/Profile"
import Register from "./Components/Register"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>  
        <Route path="/profile" element={<Profile/>}/>  
        <Route path="/register" element={<Register/>}/>  
      </Routes>
    </BrowserRouter>
  )
}

export default App
