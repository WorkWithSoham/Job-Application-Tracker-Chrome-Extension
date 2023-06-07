import React from "react";
import "../styles/ApplicationForm.css";

// React bootstrap imports
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const ApplicationForm = () => {
	const jobDescription: string = `Minimum qualifications:

- Bachelor’s degree or equivalent practical experience.
- 5 years of experience with software development in one or more programming languages, and with data structures/algorithms.
- 3 years of experience testing, maintaining, or launching software products, and 1 year of experience with software design and architecture.
- 3 years of experience building software for data privacy or security (e.g., identity and access management).
	
Preferred qualifications:
	
- Master's degree or PhD in Computer Science or related technical field.
- 1 year of experience in a technical leadership role.
- Experience developing accessible technologies.`;

	return (
		<div>
			<Form className="m-5 mb-2 mt-2">
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>
						{" "}
						<h5>Position</h5>{" "}
					</Form.Label>
					<Form.Control type="name" size="sm" required />
				</Form.Group>

				<Form.Group className="mb-1" controlId="companyName">
					<Form.Label>
						{" "}
						<h5>Company</h5>
					</Form.Label>
					<Form.Control type="name" size="sm" required />
				</Form.Group>

				<Form.Group className="mb-1" controlId="formBasicPassword">
					<Form.Label>
						<h5>Location</h5>
					</Form.Label>
					<Form.Control type="name" size="sm" />
				</Form.Group>

				<Form.Group className="mb-1" controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="Remote" />
				</Form.Group>

				<Form.Select
					className="mb-1"
					defaultValue="APPLIED"
					aria-label="Default select example"
					size="sm"
				>
					<option value="APPLIED">Applied</option>
					<option value="WISHLIST">Wishlist</option>
					<option value="INTERVIEW">Interview</option>
				</Form.Select>

				<Form.Group className="mb-3" controlId="formBasicControlTextarea">
					<Form.Label>
						{" "}
						<h5>Job Details</h5>{" "}
					</Form.Label>
					<Form.Control
						plaintext
						readOnly
						as="textarea"
						style={{ fontSize: "10px", textAlign: "left", resize: "none", border: "solid 1px #dee2e6", borderRadius: "5px" }}
						rows={7}
						size="sm"
						value={jobDescription}
					/>
				</Form.Group>

				<Button className="mb-2" variant="primary" type="submit">
					Save
				</Button>
			</Form>
		</div>
	);
};
