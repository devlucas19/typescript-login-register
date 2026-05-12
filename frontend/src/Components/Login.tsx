import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate()

    async function handleLogin(){
        try {
            const response = await axios.post("http://localhost:3000/signin", {email, password})
            
            const {token} = response.data
            localStorage.setItem("token", token)
            navigate("/profile")

        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div>
            <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
            <input type="text" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={handleLogin}>sign in</button>
        </div>
    )
}

export default Login;