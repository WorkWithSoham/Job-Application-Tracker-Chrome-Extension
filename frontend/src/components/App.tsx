import React, { useState } from "react";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { ApplicationForm } from "./ApplicationForm";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { ApplicationList } from "./ApplicationList";
import { ApplicationDetailsCard } from "./ApplicationDetailsCard";
import { Application } from "../utils/interfaces";

export default function App() {
	const [defaultActiveKey, setDefaultActiveKey] = useState<string>("home");
	const [showDetails, setShowDetails] = useState<Boolean>(false);
	const [application, setApplication] = useState<Application | undefined>();

	const appListCallback = (app?: Application, tab?: string) => {
		setShowDetails(!showDetails);
		if (tab) {
			setDefaultActiveKey(tab);
		}
		if (app) {
			setApplication(app);
		}
	};

	return (
		<div style={{ backgroundColor: "rgb(183, 221, 230)" }}>
			<div style={{ border: "3px solid grey" }}>
				<h4 className="mt-3 text-center">Job Application Tracker</h4>

				{!showDetails && (
					<Tabs
						defaultActiveKey={defaultActiveKey}
						id="uncontrolled-tab-example"
						className="mx-3"
					>
						<Tab eventKey="home" title="Create">
							<ApplicationForm />
						</Tab>
						<Tab eventKey="apps" title="Applications">
							<ApplicationList callback={appListCallback} />
						</Tab>
					</Tabs>
				)}

				{showDetails && (
					<ApplicationDetailsCard
						callback={appListCallback}
						application={application}
					/>
				)}
			</div>
		</div>
	);
}
