import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

interface User{
    id: string, 
    fullName: string, 
    email: string
}

function Profile() {
    const [user, setUser] = useState<User | null>(null)
    const navigate = useNavigate()

    useEffect(()=>{
        async function getProfile(){
            try {
                const token = localStorage.getItem("token")

                if(!token){
                    navigate("/")
                    return
                }

                const response = await axios.get("http://localhost:3000/profile",{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })

                setUser(response.data)

            } catch (error) {
                navigate("/")
            }
        }

        getProfile()
    },[])

    if(!user) return <p>Loading...</p>

    return(
        <div>
            <p>{user.fullName}</p>
            <p>{user.email}</p>
        </div>
    )
}

export default Profile