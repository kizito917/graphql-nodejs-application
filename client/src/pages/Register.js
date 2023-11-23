import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/auth.service";

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleFormChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            alert('Kindly fill all form fields.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert('Password should match Confirm password');
            return;
        }

        // process form fields to server
        const { status, data, message } = await registerUser(formData);
        if (status !== 200) {
            alert(message);
            return;
        }

        alert(message);
        navigate('/');
    }

    return (
        <>
            <div className="page-wrapper">
                <div className="page-content">
                    <h3>Welcome to my GraphQL app</h3>
                    <p>Register account</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" name="name" value={formData.name} className="form-control" placeholder="Enter name" onChange={(event) => handleFormChange(event)} />
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" value={formData.email} className="form-control" placeholder="Enter email" onChange={(event) => handleFormChange(event)} />
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" value={formData.password} className="form-control" placeholder="Enter password" onChange={(event) => handleFormChange(event)} />
                        </div>
                        <div className="form-group">
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} className="form-control" placeholder="Confirm password" onChange={(event) => handleFormChange(event)} />
                        </div>
                        <div className="form-group">
                            <button>Create</button>
                        </div>
                    </form>
                    <p>Already have an account? <Link to="/">Login</Link></p>
                </div>
            </div>
        </>
    )
}