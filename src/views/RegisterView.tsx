// src/components/Register.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        identification: "",
        email: "",
        phone: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Sending data: ", formData);
            const response = await fetch("http://18.212.24.38:10011/command/personService", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            console.log("Response status: ", response.status);
            
            if (response.status === 201) {
                alert("Register complete");
                navigate("/");
            } else {
                const errorText = await response.text();
                console.error("Error response: ", errorText);
            }
        } catch (error) {
            console.error("Error during registration: ", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center">Register</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    {Object.keys(formData).map((field) => (
                        <input
                            key={field}
                            type="text"
                            name={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={formData[field]}
                            onChange={handleChange}
                            className="w-full p-2 mb-4 border rounded-md"
                            required
                        />
                    ))}
                    <input type="submit" value="Register" className="w-full p-2 text-white bg-green-600 rounded-md hover:bg-green-700" />
                </form>
                <button
                    onClick={() => navigate(-1)}
                    className="w-full p-2 mt-4 text-white bg-gray-600 rounded-md hover:bg-gray-700"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default Register;
