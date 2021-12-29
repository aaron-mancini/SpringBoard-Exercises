import React, { useState, useContext } from "react";
import UserContext from "./UserContext";
import { Button, Card, CardBody, Form, FormGroup, Input, Label } from "reactstrap";
import JoblyApi from "./api";

const Profile = ({ updateUser }) => {
    const { currUser, setCurrUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        email: currUser.email,
        username: currUser.username,
        password: "",
    });
    console.log(currUser);

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        
        let profile = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        }

        let username = formData.username;
        let updateUser;

        try {
            updateUser = await JoblyApi.saveProfile(username, profile);
        } catch (error) {
            return;
        }

        setFormData(fData => ({
            ...fData,
            password: ""
        }));
        
        setCurrUser(updateUser);
    }

    return (
        <div className="pt-5">
            <div className="SignupForm">
                <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                    <h2 className="mb-3">Profile</h2>
                    <Card>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label>Username</Label>
                                    <p>{currUser.username}</p>
                                </FormGroup>
                                <FormGroup>
                                    <Label>First Name</Label>
                                    <Input                                        
                                        name="firstName"
                                        placeholder={currUser.firstName}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Last name</Label>
                                    <Input
                                        name="lastName"
                                        placeholder={currUser.lastName}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder={currUser.email}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Confirm password to make changes</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <Button type="submit" color="primary">
                                    Save Changes
                                </Button>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Profile;