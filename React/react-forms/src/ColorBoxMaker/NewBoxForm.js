import React, { useState } from "react";

const NewBoxForm = ({ addBox }) => {
    const INITIAL_STATE = { color: "", height: "100", width: "100" }
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleSubmit = evt => {
        evt.preventDefault();
        addBox(formData);
        setFormData(INITIAL_STATE);
    };

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="color">Color:</label>
            <input
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
            />
            <label htmlFor="height">Height:</label>
            <input
                type="number"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
            />
            <label htmlFor="width">Width:</label>
            <input
                type="number"
                id="width"
                name="width"
                value={formData.width}
                onChange={handleChange}
            />

            <button>Add a new Box!</button>
        </form>
    )
}

export default NewBoxForm;