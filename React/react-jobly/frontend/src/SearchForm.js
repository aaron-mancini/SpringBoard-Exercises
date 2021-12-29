import React, { useState } from "react";
import { Form, Button, Input } from "reactstrap";

const SearchForm = ({ search }) => {
    const [formData, setFormData] = useState();

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        search(formData.searchTerm);
    }

    return (
        <div className="SearchForm mb-4">
            <Form className="form-inline" onSubmit={handleSubmit}>
                <Input
                    className="form-control-lg flex-grow-1"
                    type="text"
                    name="searchTerm"
                    placeholder="Enter search term.."
                    onChange={handleChange}
                />
                <Button type="submit" className="btn btn-lg" color="primary">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default SearchForm;