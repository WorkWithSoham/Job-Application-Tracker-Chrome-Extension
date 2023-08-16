import React, {FormEvent, useState} from "react";
import "../styles/ApplicationForm.css";

// React bootstrap imports
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import {Application, status} from "../utils/interfaces";
import {ApiService} from "../utils/api.service";

import Paper from "@mui/material/Paper";
import Alert from '@mui/material/Alert';
import {Utils} from "../utils/utils";

export const ApplicationForm = () => {

    const [showAlert, setShowAlert] = useState<boolean>(false);
    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const targetValue = e.currentTarget;
        const formData: Application = {
            user_id: 1,
            position: targetValue.position.value,
            location: targetValue.location.value ?? "",
            company: targetValue.company.value,
            remote: targetValue.remote.checked,
            status: targetValue.status.value as status,
            jd: targetValue.jd.value ?? "",
            app_date: Utils.formatDate(new Date())
        };
        const res = await ApiService.addApplication(formData);
        targetValue.reset();
        if (res.data) {
            setShowAlert(true);
        }
    };

    return (
        <div>
            <Paper
                elevation={20}
                className="m-2 mb-3 p-1"
                component="div"
                sx={{
                    "& .MuiTextField-root": {m: 1, width: "32ch"},
                }}
            >
                {showAlert &&
                    <Alert severity="success" onClose={() => setShowAlert(false)}>
                        Application added to your list!
                    </Alert>
                }
                <Form className="m-3 mb-2 mt-2" onSubmit={onFormSubmit}>
                    <Form.Group className="" controlId="position">
                        <Form.Label>
                            {" "}
                            <h5>Position</h5>{" "}
                        </Form.Label>
                        <Form.Control type="name" size="sm" required/>
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="company">
                        <Form.Label>
                            {" "}
                            <h5>Company</h5>
                        </Form.Label>
                        <Form.Control type="name" size="sm" required/>
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="location">
                        <Form.Label>
                            <h5>Location</h5>
                        </Form.Label>
                        <Form.Control type="name" size="sm"/>
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="remote">
                        <Form.Check type="checkbox" label="Remote"/>
                    </Form.Group>

                    <Form.Group className="mb-1" controlId="status">
                        <Form.Select
                            defaultValue="APPLIED"
                            aria-label="Default select example"
                            size="sm"
                        >
                            <option value="APPLIED">Applied</option>
                            <option value="WISHLIST">Wishlist</option>
                            <option value="INTERVIEW">Interview</option>
                            <option value="REJECT">Reject</option>
                            <option value="OFFER">Offer</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="jd">
                        <Form.Label>
                            <h5>Job Link</h5>
                        </Form.Label>
                        <Form.Control type="name" size="sm"/>
                    </Form.Group>

                    <Button className="mx-auto mb-2" variant="success" type="submit">
                        Save
                    </Button>
                </Form>
            </Paper>
        </div>
    );
};
