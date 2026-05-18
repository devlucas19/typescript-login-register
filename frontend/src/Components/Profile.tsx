import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../index.css";

interface User {
    id: string
    fullName: string
    email: string
}

function Profile() {
    const [user, setUser] = useState<User | null>(null)
    const [newEmail, setNewEmail] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        async function getProfile() {
            try {
                const token = localStorage.getItem("token")
                if (!token) { navigate("/"); return }

                const response = await axios.get("http://localhost:3000/profile", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setUser(response.data)
            } catch {
                navigate("/")
            }
        }
        getProfile()
    }, [])

    function logout() {
        localStorage.setItem("token", "")
        navigate("/")
    }

    async function changeEmail() {
        setError("")
        setSuccess("")
        setLoading(true)
        try {
            const token = localStorage.getItem("token")
            if (!token) { navigate("/"); return }

            await axios.post(
                "http://localhost:3000/changeEmail",
                { newEmail },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            setSuccess("Email successfully changed!")
            setNewEmail("")
            navigate(0)
        } catch (err: any) {
            const message = err?.response?.data?.message || "Something went wrong"
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    if (!user) return <p style={{ fontFamily: "DM Sans, sans-serif", textAlign: "center", marginTop: "4rem", color: "#6b85b0" }}>Loading...</p>

    const initials = user.fullName
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()

    return (
        <div className="profile-wrapper">
            <div className="profile-card">

                {/* Header */}
                <div className="profile-header">
                    <div className="profile-avatar">{initials}</div>
                    <div className="profile-name">{user.fullName}</div>
                    <div className="profile-email-display">{user.email}</div>
                </div>

                {/* Body */}
                <div className="profile-body">

                    <p className="profile-section-title">Change Email</p>

                    {error && (
                        <div className="profile-error">
                            <span className="auth-error-icon">!</span>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="profile-success">
                            ✓ {success}
                        </div>
                    )}

                    <div className="profile-field auth-field">
                        <label className="auth-label">New Email Address</label>
                        <input
                            className="auth-input"
                            type="text"
                            placeholder="new@example.com"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && changeEmail()}
                        />
                    </div>

                    <button
                        className="profile-action-btn"
                        onClick={changeEmail}
                        disabled={loading}
                    >
                        {loading ? <span className="auth-spinner" /> : "UPDATE EMAIL"}
                    </button>

                    <div className="profile-divider" />

                    <button className="profile-logout-btn" onClick={logout}>
                        LOGOUT
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Profile
