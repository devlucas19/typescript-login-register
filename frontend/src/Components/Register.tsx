import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import "../index.css"

function Register() {
    const [fullName, setFullName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    async function register() {
        setError("")
        setLoading(true)
        try {
            await axios.post("http://localhost:3000/signup", { fullName, email, password })
            navigate("/")
        } catch (err: any) {
            const message = err?.response?.data?.message || "Something went wrong"
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-left">
                <div className="auth-left-content">
                    <span className="auth-brand-mark">✦</span>
                    <h2 className="auth-left-title">Create<br />your account.</h2>
                    <p className="auth-left-sub">Join us and get started in seconds.</p>
                </div>
                <div className="auth-left-footer"></div>
            </div>

            <div className="auth-right">
                <div className="auth-form-box">
                    <div className="auth-greeting">
                        <span className="auth-greeting-tag">New here?</span>
                        <p className="auth-greeting-time">Let's get you set up</p>
                    </div>

                    <h1 className="auth-title">Create Your Account</h1>

                    {error && (
                        <div className="auth-error">
                            <span className="auth-error-icon">!</span>
                            {error}
                        </div>
                    )}

                    <div className="auth-field">
                        <label className="auth-label">Full Name</label>
                        <input
                            className="auth-input"
                            type="text"
                            placeholder="Lucas Lima"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label">Email Address</label>
                        <input
                            className="auth-input"
                            type="text"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label">Password</label>
                        <input
                            className="auth-input"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && register()}
                        />
                    </div>

                    <button
                        className={`auth-btn ${loading ? "auth-btn--loading" : ""}`}
                        onClick={register}
                        disabled={loading}
                    >
                        {loading ? <span className="auth-spinner" /> : "SIGN UP"}
                    </button>

                    <p className="auth-switch">
                        Already have an account?{" "}
                        <Link to="/" className="auth-link">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register