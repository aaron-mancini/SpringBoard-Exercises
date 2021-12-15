import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewColorForm = ({ addColor }) => {
    const INITIAL_STATE = { name: "", color: "#000000" }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const navigate = useNavigate();
    

    const handleSubmit = evt => {
        evt.preventDefault();
        addColor(formData);
        setFormData(INITIAL_STATE);
        navigate("/colors")
    }

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }))
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            <input 
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
            />
            <button>Add Color</button>
        </form>
    )
}

export default NewColorForm;