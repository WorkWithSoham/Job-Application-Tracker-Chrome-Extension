import React from "react";
import "../styles/ApplicationForm.css";

// React bootstrap imports
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const ApplicationForm = () => {

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
						className="p-2"
						plaintext
						readOnly
						as="textarea"
						style={{ fontSize: "10px", textAlign: "left", resize: "none", border: "solid 1px #dee2e6", borderRadius: "5px" }}
						rows={7}
						size="sm"
						value=""
					/>
				</Form.Group>

				<Button className="mx-auto mb-2" variant="success" type="submit">
					Save
				</Button>
			</Form>
		</div>
	);
};
