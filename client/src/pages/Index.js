import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import { signInUser } from "../services/auth.service";

export default function Index() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.email || !formData.password) {
            alert("Kindly fill all form fields.");
            return;
        }

        // Send data to server
        const { status, message, data } = await signInUser(formData);
        if (status !== 200) {
            alert(message);
            return;
        }

        localStorage.setItem('user_token', data);
        alert(message);
        navigate('/dashboard');
    }

    return (
        <>
            <div className="page-wrapper">
                <div className="page-content">
                    <h3>Welcome to my GraphQL sample app</h3>
                    <p>Sign in</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input name="email" type="email" value={formData.email} className="form-control" placeholder="Enter email" onChange={(event) => handleChange(event)} />
                        </div>
                        <div className="form-group">
                            <input name="password" type="password" value={formData.password} className="form-control" placeholder="Enter password" onChange={(event) => handleChange(event)} />
                        </div>
                        <div className="form-group">
                            <button>Create</button>
                        </div>
                    </form>
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
            </div>
        </>
    )
}