import React, { useState } from "react";
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";

const SignupForm = ({ signup }) => {
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
        signup(formData);
    }

    return (
        <div className="pt-5">
            <div className="SignupForm">
                <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <h2 className="mb-3">Sign Up</h2>
                    <Card>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label>Username</Label>
                                    <Input
                                        name="username"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>First name</Label>
                                    <Input
                                        name="firstName"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Last name</Label>
                                    <Input
                                        name="lastName"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default SignupForm;