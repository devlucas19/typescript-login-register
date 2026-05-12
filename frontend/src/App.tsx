import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./Components/Login"
import Profile from "./Components/Profile"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>  
        <Route path="/profile" element={<Profile/>}/>  
      </Routes>
    </BrowserRouter>
  )
}

export default App
