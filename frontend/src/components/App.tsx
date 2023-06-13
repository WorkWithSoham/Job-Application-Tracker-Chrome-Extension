import React from "react";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { ApplicationForm } from "./ApplicationForm";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { ApplicationList } from "./ApplicationList";

export default function App() {
	return (
		<div style={{ backgroundColor: "rgb(183, 221, 230)" }}>
			<div style={{ border: "3px solid grey" }}>
				<h4 className="mt-3 text-center">Job Application Tracker</h4>

				<Tabs
					defaultActiveKey="home"
					id="uncontrolled-tab-example"
					className="mx-3"
				>
					<Tab eventKey="home" title="Add">
						<ApplicationForm />
					</Tab>
					<Tab eventKey="profile" title="List">
						<ApplicationList />
					</Tab>
				</Tabs>
			</div>
		</div>
	);
}
