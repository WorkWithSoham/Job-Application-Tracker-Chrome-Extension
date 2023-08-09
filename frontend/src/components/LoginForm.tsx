import React, {FormEvent, useState} from "react";
import "../styles/LoginForm.css";

// React bootstrap imports
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import {User} from "../utils/interfaces";
import {ApiService} from "../utils/api.service";
import Paper from "@mui/material/Paper";

import Alert from '@mui/material/Alert';

export const LoginForm = () => {
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [signIn, setSignIn] = useState(false);

    const onSignUpFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const targetValue = e.currentTarget;
        if (targetValue.password.value !== targetValue.confirm_password.value) {
            alert("Password values don't match!")
        } else {
            const formData: User = {
                full_name: targetValue.full_name.value,
                username: targetValue.username.value,
                email: targetValue.email.value,
                password: targetValue.password.value
            };
            await ApiService.addUser(formData);
            targetValue.reset();
            setShowAlert(true)
        }
    };

    const onLoginFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <div style={{height: "416px"}}>
            {" "}
            {!signIn ? (
                <Paper
                    elevation={20}
                    className="m-2 mb-3 p-1"
                    component="div"
                    sx={{
                        "& .MuiTextField-root": {m: 1, width: "32ch"},
                    }}
                >
                    <Form className="m-3 mb-2 mt-2" onSubmit={onLoginFormSubmit}>
                        <Form.Group className="" controlId="username">
                            <Form.Label>
                                {" "}
                                <h5>Username</h5>{" "}
                            </Form.Label>
                            <Form.Control type="name" size="sm" required/>
                        </Form.Group>

                        <Form.Group className="mb-1" controlId="password">
                            <Form.Label>
                                {" "}
                                <h5>Password</h5>
                            </Form.Label>
                            <Form.Control type="password" size="sm" required/>
                        </Form.Group>

                        <Button className="m-2" variant="success" type="submit">
                            Log In
                        </Button>
                        <Button
                            className="mx-auto m-2"
                            variant="success"
                            type="submit"
                            onClick={() => setSignIn(true)}
                        >
                            Sign In
                        </Button>
                    </Form>
                </Paper>
            ) : (showAlert ?
                    <Paper
                        elevation={20}
                        className="m-2 mb-3 p-1"
                        component="div"
                        sx={{
                            "& .MuiTextField-root": {m: 1, width: "32ch"},
                        }}
                    >
                        <Alert severity="success"
                               className="m-3"
                               onClose={() => {
                                   setShowAlert(false)
                                   setSignIn(false)
                               }}>
                            Successfully created your account! Please login to use!
                        </Alert>
                    </Paper>
                    :
                    <Paper
                        elevation={20}
                        className="m-2 mb-3 p-1"
                        component="div"
                        sx={{
                            "& .MuiTextField-root": {m: 1, width: "32ch"},
                        }}
                    >
                        <Form className="m-3 mb-2 mt-2" onSubmit={onSignUpFormSubmit}>
                            <Form.Group className="" controlId="full_name">
                                <Form.Label>
                                    {" "}
                                    <h5>Full Name</h5>{" "}
                                </Form.Label>
                                <Form.Control type="name" size="sm" required/>
                            </Form.Group>

                            <Form.Group className="mb-1" controlId="username">
                                <Form.Label>
                                    {" "}
                                    <h5>Username</h5>
                                </Form.Label>
                                <Form.Control type="name" size="sm" required/>
                            </Form.Group>

                            <Form.Group className="mb-1" controlId="email">
                                <Form.Label>
                                    <h5>Email</h5>
                                </Form.Label>
                                <Form.Control type="name" size="sm"/>
                            </Form.Group>

                            <Form.Group className="mb-1" controlId="password">
                                <Form.Label>
                                    <h5>Password</h5>
                                </Form.Label>
                                <Form.Control type="password" size="sm"/>
                            </Form.Group>

                            <Form.Group className="mb-1" controlId="confirm_password">
                                <Form.Label>
                                    <h5>Confirm Password</h5>
                                </Form.Label>
                                <Form.Control type="password" size="sm"/>
                            </Form.Group>

                            <Button
                                className="mx-auto mb-2 mt-2"
                                variant="success"
                                type="submit"
                            >
                                Sign In
                            </Button>
                        </Form>
                    </Paper>
            )}
        </div>
    );
};
