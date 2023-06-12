import React from "react";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApplicationForm } from "./ApplicationForm";

export default function App() {
	return ( 
		<div style={{ backgroundColor: "rgb(183, 221, 230)" }}>
			<div style={{ border: "3px solid grey" }}>
				<h2 className="mt-3 text-center">Job Application Tracker</h2>
				<ApplicationForm />
			</div>
		</div>
	);
}
