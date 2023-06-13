import React, { FormEvent } from "react";
import "../styles/ApplicationForm.css";

// React bootstrap imports
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { ApplicationFormInterface, status } from "../utils/interfaces";
import { ApiService } from "../utils/api.service";

export const ApplicationForm = () => {

	const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const targetValue = e.currentTarget
		console.log(targetValue.position.value)
		const formData: ApplicationFormInterface = {
			user_id: 1,
			position: targetValue.position.value,
			location: targetValue.location.value ?? "",
			company: targetValue.company.value,
			remote: targetValue.remote.checked,
			status: targetValue.status.value as status,
			jd: targetValue.jd.value ?? ""
		}
		ApiService.addApplication(formData);
	}


	return (
		<div className="mb-2 applicationForm">
			<Form className="m-3 mb-2 mt-2" onSubmit={onFormSubmit}>
				<Form.Group className="mb-3" controlId="position">
					<Form.Label>
						{" "}
						<h5>Position</h5>{" "}
					</Form.Label>
					<Form.Control type="name" size="sm" required />
				</Form.Group>

				<Form.Group className="mb-1" controlId="company">
					<Form.Label>
						{" "}
						<h5>Company</h5>
					</Form.Label>
					<Form.Control type="name" size="sm" required />
				</Form.Group>

				<Form.Group className="mb-1" controlId="location">
					<Form.Label>
						<h5>Location</h5>
					</Form.Label>
					<Form.Control type="name" size="sm" />
				</Form.Group>

				<Form.Group className="mb-1" controlId="remote">
					<Form.Check type="checkbox" label="Remote" />
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
						{" "}
						<h5>Job Details</h5>{" "}
					</Form.Label>
					<Form.Control
						className="p-2"
						as="textarea"
						style={{ fontSize: "10px", textAlign: "left", resize: "none", border: "solid 1px #dee2e6", borderRadius: "5px" }}
						rows={7}
						size="sm"
					/>
				</Form.Group>

				<Button className="mx-auto mb-2" variant="success" type="submit">
					Save
				</Button>
			</Form>
		</div>
	);
};
